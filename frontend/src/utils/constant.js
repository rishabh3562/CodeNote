// This file contains all the constants used in the frontend
// Note: The URL of any kind in the end should not end with a slash (/)
// as it will be added in the code where it is used.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const PATH = {
  GENERATE_README: '/api/code/generate-readme',
  GENERATE_README_2: '/api/code/generate-readme2',
  GEMINI: '/api/code/gemini',
};

const ENDPOINT = {
  GENERATE_README: `${API_URL}${PATH.GENERATE_README}`,
  GENERATE_README_2: `${API_URL}${PATH.GENERATE_README_2}`,
  GEMINI: `${API_URL}${PATH.GEMINI}`,
  TEST: `${API_URL}/test`,
  GET_RESPONSE: `${API_URL}${PATH.GET_RESPONSE}`,
};

export const FRONTEND_ROUTES = {
  HOME: '/', // Home page
  TEST: '/test', // Test route
  GENERATE_SINGLE_README: '/generate-readme', // Single README generation page
  GITHUB_VIEWER: '/githubviewer', // GitHub Viewer page
  GITHUB_REPO_VIEWER: '/githubrepo-viewer', // GitHub Repo Viewer page
  PRIVATE_GITHUB_REPO_VIEWER: '/private-github-repo-viewer', // Private GitHub Repo Viewer
  MARKDOWN_EDITOR: '/markdown-editor', // Markdown editor page
  NOT_FOUND: '*', // Fallback for undefined routes
  DOCUMENTATION: '/documentation', // Documentation page
};

export const FRONTEND_BASE_URL =
  import.meta.env.VITE_FRONTEND_BASE_URL || 'http://localhost:5173';
export { API_URL, ENDPOINT, PATH };
