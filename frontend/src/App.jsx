import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { FRONTEND_ROUTES } from './utils/constant';
import { Wrapper } from './components/SuspenseWrapper';
import Documentation from './pages/Documentation';

const MarkdownEditor = lazy(() => import('./pages/MarkDownEditor'));
const Home = lazy(() => import('./pages/Home'));
const GitHubViewer = lazy(() => import('./pages/GitHubViewer'));
const GitHubRepoViewer = lazy(() => import('./pages/GtihubRepoViewer'));
const PrivateGitHubRepoViewer = lazy(
  () => import('./pages/PrivateGitHubRepoViewer')
);
const GenerateReadme = lazy(() => import('./pages/GenerateSingleReadme'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UserStats = lazy(() => import('./pages/UserStats'));

const Test = () => {
  return (
    <div>
      <h1>Router Working</h1>
    </div>
  );
};

const WebRouter = createBrowserRouter([
  {
    path: FRONTEND_ROUTES.HOME,
    element: <Wrapper element={<Home />} />,
  },
  {
    path: FRONTEND_ROUTES.TEST,
    element: <Wrapper element={<Test />} />,
  },
  {
    path: FRONTEND_ROUTES.GENERATE_SINGLE_README,
    element: <Wrapper element={<GenerateReadme />} />,
  },
  {
    path: FRONTEND_ROUTES.GITHUB_VIEWER,
    element: <Wrapper element={<GitHubViewer />} />,
  },
  {
    path: FRONTEND_ROUTES.GITHUB_REPO_VIEWER,
    element: <Wrapper element={<GitHubRepoViewer />} />,
  },
  {
    path: FRONTEND_ROUTES.PRIVATE_GITHUB_REPO_VIEWER,
    element: <Wrapper element={<PrivateGitHubRepoViewer />} />,
  },
  {
    path: FRONTEND_ROUTES.MARKDOWN_EDITOR,
    element: <Wrapper element={<MarkdownEditor />} />,
  },
  {
    path: FRONTEND_ROUTES.DOCUMENTATION,
    element: <Wrapper element={<Documentation />} />,
  },
  {
    path: FRONTEND_ROUTES.NOT_FOUND,
    element: <Wrapper element={<NotFound />} />,
  },
  {
    path: FRONTEND_ROUTES.STATS,
    element: <Wrapper element={<UserStats />} />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={WebRouter} />
    </>
  );
}

export default App;
