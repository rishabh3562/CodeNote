import Documentation from '../models/Documentation.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const detectTechStack = (files) => {
  const fileExtensions = new Set();
  const configFiles = new Set();
  const techStack = {
    languages: new Set(),
    frameworks: new Set(),
    packageManager: null,
  };

  const processFile = (file) => {
    if (file.type === 'file') {
      const ext = file.name.split('.').pop().toLowerCase();
      fileExtensions.add(ext);
      configFiles.add(file.name.toLowerCase());
    }
    if (file.children) {
      file.children.forEach(processFile);
    }
  };

  files.forEach(processFile);

  // Detect languages
  const extensionToLanguage = {
    js: 'JavaScript',
    jsx: 'JavaScript (React)',
    ts: 'TypeScript',
    tsx: 'TypeScript (React)',
    vue: 'Vue.js',
    cpp: 'C++',
    c: 'C',
    java: 'Java',
    py: 'Python',
    rb: 'Ruby',
    php: 'PHP',
    sol: 'Solidity',
    go: 'Go',
    rs: 'Rust',
    // Add more as needed
  };

  // Detect frameworks
  const frameworkIdentifiers = {
    'package.json': (content) => {
      const pkg = JSON.parse(content);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      if (deps.react) techStack.frameworks.add('React.js');
      if (deps.angular) techStack.frameworks.add('Angular');
      if (deps.vue) techStack.frameworks.add('Vue.js');
      if (deps.next) techStack.frameworks.add('Next.js');
      if (deps.svelte) techStack.frameworks.add('Svelte');
      return deps;
    },
    'pom.xml': () => techStack.frameworks.add('Spring Boot'),
    'angular.json': () => techStack.frameworks.add('Angular'),
    'next.config.js': () => techStack.frameworks.add('Next.js'),
    'svelte.config.js': () => techStack.frameworks.add('Svelte'),
  };

  fileExtensions.forEach((ext) => {
    if (extensionToLanguage[ext]) {
      techStack.languages.add(extensionToLanguage[ext]);
    }
  });

  return techStack;
};

const getSpecificPrompts = (techStack) => {
  const prompts = {
    'JavaScript (React)': `
      For React components, analyze:
      - Component type (functional/class)
      - Props and their usage
      - State management (useState, useEffect, etc.)
      - Component lifecycle
      - Context usage
      - Custom hooks
      - Event handlers
      - Render logic
    `,
    'Vue.js': `
      For Vue components, analyze:
      - Component structure
      - Props and events
      - Data properties
      - Computed properties
      - Methods
      - Lifecycle hooks
      - Watchers
      - Template syntax
    `,
    'C++': `
      For C++ code, analyze:
      - Class hierarchies
      - Memory management
      - STL usage
      - Algorithms
      - Performance considerations
      - Header organization
      - Template usage
    `,
    // Add more language/framework specific prompts
  };

  return Array.from(techStack.languages)
    .map((lang) => prompts[lang] || '')
    .join('\n');
};

const documentationController = {
  // Fetch repository contents
  async fetchRepository(req, res) {
    try {
      const { repoUrl } = req.body;

      const urlParts = repoUrl
        .replace('https://github.com/', '')
        .replace('http://github.com/', '')
        .split('/');

      const owner = urlParts[0];
      const repo = urlParts[1];

      if (!owner || !repo) {
        return res.status(400).json({
          message:
            'Invalid repository URL. Format should be: https://github.com/owner/repo',
        });
      }

      async function fetchContents(path = '') {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              ...(process.env.GITHUB_TOKEN && {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
              }),
            },
          }
        );

        const items = await Promise.all(
          response.data.map(async (item) => {
            const result = {
              name: item.name,
              path: item.path,
              type: item.type,
              url: item.download_url,
            };

            if (item.type === 'dir') {
              result.children = await fetchContents(item.path);
            }

            return result;
          })
        );

        return items;
      }

      const files = await fetchContents();
      res.json(files);
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        message:
          error.response?.data?.message ||
          'Failed to fetch repository contents',
      });
    }
  },

  // Generate documentation
  async generateDocumentation(req, res) {
    try {
      const { files, repoUrl } = req.body;
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Use the standalone functions instead of this.detectTechStack
      const techStack = detectTechStack(files);
      const specificPrompts = getSpecificPrompts(techStack);

      const prompt = `As an expert developer, analyze the following codebase and generate detailed documentation.
      
      Technical Stack Detected:
      Languages: ${Array.from(techStack.languages).join(', ')}
      Frameworks: ${Array.from(techStack.frameworks).join(', ')}
      
      Codebase: ${JSON.stringify(files)}

      ${specificPrompts}

      Please provide a comprehensive analysis following this structure:

      1. Project Overview
         - Main purpose and functionality
         - Key features
         - Technologies used

      2. Technical Stack Analysis
         - Languages and versions
         - Frameworks and libraries
         - Architecture patterns used

      3. Detailed Code Analysis
         For each file:
         - Purpose and responsibility
         - Language/framework-specific features used
         - Key functions/components and their roles
         - Important variables and their usage
         - Logic flow explanation
         - Any notable algorithms or patterns

      4. Dependencies and Integration
         - External libraries used
         - How different parts interact
         - API integrations (if any)

      5. Setup and Configuration
         - Installation steps
         - Required environment variables
         - Configuration options

      6. Best Practices and Patterns
         - Language-specific best practices followed
         - Framework-specific patterns used
         - Error handling approach
         - Performance considerations

      7. Potential Improvements
         - Code optimization suggestions
         - Scalability considerations
         - Security recommendations

      Please format the documentation in Markdown and ensure it's developer-friendly with code examples where relevant.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const documentation = response.text();

      // Save to database
      const newDoc = new Documentation({
        repositoryUrl: repoUrl,
        generatedDocs: documentation,
        techStack: {
          languages: Array.from(techStack.languages),
          frameworks: Array.from(techStack.frameworks),
        },
      });
      await newDoc.save();

      res.json({ documentation, techStack });
    } catch (error) {
      console.error('Error generating documentation:', error);
      res.status(500).json({ message: error.message });
    }
  },

  async fetchFileContent(req, res) {
    try {
      const { owner, repo, path } = req.body;

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            }),
          },
        }
      );

      // GitHub API returns base64 encoded content
      const content = Buffer.from(response.data.content, 'base64').toString();
      res.json({ content });
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        message:
          error.response?.data?.message || 'Failed to fetch file content',
      });
    }
  },
  async fetchRepoWithoutAuth(req, res) {
    try {
      const { repoUrl } = req.body;

      const urlParts = repoUrl
        .replace(/https?:\/\/github.com\//, '')
        .split('/');
      const owner = urlParts[0];
      const repo = urlParts[1];

      if (!owner || !repo) {
        return res.status(400).json({
          message:
            'Invalid repository URL. Format should be: https://github.com/owner/repo',
        });
      }

      async function fetchContents(path = '') {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        const items = await Promise.all(
          response.data.map(async (item) => {
            const result = {
              name: item.name,
              path: item.path,
              type: item.type,
              url: item.download_url,
            };

            if (item.type === 'dir') {
              result.children = await fetchContents(item.path);
            }

            return result;
          })
        );

        return items;
      }

      const files = await fetchContents();
      res.json(files);
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);

      if (error.response?.status === 403) {
        return res.status(403).json({
          message:
            'GitHub API rate limit exceeded. Try again later or authenticate with a token.',
        });
      }

      res.status(error.response?.status || 500).json({
        message:
          error.response?.data?.message ||
          'Failed to fetch repository contents',
      });
    }
  },
};

export default documentationController;
