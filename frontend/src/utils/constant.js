// This file contains all the constants used in the frontend
// Note: The URL should not end with a slash (/).

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const PATH = {
  GENERATE_README: '/api/code/generate-readme',
  GENERATE_README_2: '/api/code/generate-readme2',
  GEMINI: '/api/code/gemini',
  GET_RESPONSE: '/api/code/get-response', // ✅ Added missing endpoint
};

const ENDPOINT = {
  GENERATE_README: `${API_URL}${PATH.GENERATE_README}`,
  GENERATE_README_2: `${API_URL}${PATH.GENERATE_README_2}`,
  GEMINI: `${API_URL}${PATH.GEMINI}`,
  GET_RESPONSE: `${API_URL}${PATH.GET_RESPONSE}`, // ✅ Now correctly referenced
  TEST: `${API_URL}/test`,
};

export const FRONTEND_ROUTES = {
  HOME: '/',
  TEST: '/test',
  GENERATE_SINGLE_README: '/generate-readme',
  GITHUB_VIEWER: '/githubviewer',
  GITHUB_REPO_VIEWER: '/githubrepo-viewer',
  PRIVATE_GITHUB_REPO_VIEWER: '/private-github-repo-viewer',
  MARKDOWN_EDITOR: '/markdown-editor',
  NOT_FOUND: '*',
  DOCUMENTATION: '/documentation',
  STATS: '/stats',
};

export const FRONTEND_BASE_URL =
  import.meta.env.VITE_FRONTEND_BASE_URL || 'http://localhost:5173';

export { API_URL, ENDPOINT, PATH };
