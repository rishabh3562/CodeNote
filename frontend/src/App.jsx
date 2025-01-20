import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Updated import statements for v6
import "./index.css";


const MarkdownEditor = lazy(() => import("./pages/MarkDownEditor"));
const Home = lazy(() => import("./pages/Home"));
const GitHubViewer = lazy(() => import("./pages/GitHubViewer"));
const GitHubRepoViewer = lazy(() => import("./pages/GtihubRepoViewer"));
const PrivateGitHubRepoViewer = lazy(() =>
  import("./pages/PrivateGitHubRepoViewer")
);
const GenerateReadme = lazy(() => import("./pages/GenerateSingleReadme"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Test = () => {
  return (
    <div>
      <h1>router working </h1>
    </div>
  );
};

const WebRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    ),
  },
  {
    path: "/generateReadme",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GenerateReadme />
      </Suspense>
    ),
  },
  {
    path: "/GitHubViewer",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GitHubViewer />
      </Suspense>
    ),
  },
  {
    path: "/GitHubRepoViewer",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GitHubRepoViewer />
      </Suspense>
    ),
  },
  {
    path: "/PrivateGitHubRepoViewer",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateGitHubRepoViewer />
      </Suspense>
    ),
  },



  {
    path: "/md",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MarkdownEditor />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
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
