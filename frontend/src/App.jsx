import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // Updated import statements for v6
// import GenerateReadme from "./pages/GenerateSingleReadme";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import "./index.css";
import DocsViewer from "./components/DocsViewer";
import RepoFetcher from "./components/RepoFetcher";
const Llmcall = lazy(() => import("./components/Llmcall"));
const MarkdownEditor = lazy(() => import("./pages/MarkDownEditor"));

const Home = lazy(() => import("./pages/Home"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotePage = lazy(() => import("./pages/NotePage"));
const RepoStructure = lazy(() => import("./components/RepoStructure"));
const GitHubRepoViewer = lazy(() => import("./pages/GitHubRepoViewer"));
const GitHubRepoViewerv1 = lazy(() => import("./pages/GtihubRepoViewerv1"));
const GenerateReadme = lazy(() => import("./pages/GenerateSingleReadme"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatBot = lazy(() => import("./pages/ChatBot"));
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
    path: "/GitHubRepoViewer",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GitHubRepoViewer />
      </Suspense>
    ),
  },
  {
    path: "/GitHubRepoViewerv1",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GitHubRepoViewerv1 />
      </Suspense>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectPage />
      </Suspense>
    ),
  },
  {
    path: "/projects/:projectId/notes/:noteId",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotePage />
      </Suspense>
    ),
  },
  {
    path: "/Docsviewer",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DocsViewer />
      </Suspense>
    ),
  },
  {
    path: "/repofetcher.jsx",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RepoFetcher />
      </Suspense>
    ),
  },
  {
    path: "/Llmcall",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Llmcall />
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
  {
    path: "/ChatBot",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ChatBot />
      </Suspense>
    ),
  },
  {
    path: "/projects/:projectId/structure",
    element: (
      <BreadcrumbProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RepoStructure />
        </Suspense>
      </BreadcrumbProvider>
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
