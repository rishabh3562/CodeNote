import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // Updated import statements for v6
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import "./index.css";
const Home = lazy(() => import("./pages/Home"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotePage = lazy(() => import("./pages/NotePage"));
const RepoStructure = lazy(() => import("./components/RepoStructure"));
const GitHubRepoViewer = lazy(() => import("./pages/GitHubRepoViewer"));
const GitHubRepoViewerv1 = lazy(() => import("./pages/GtihubRepoViewerv1"));
const WebRouter = createBrowserRouter([
  {
    path: "/",
    element: <GitHubRepoViewer />,
    
  },
  {
    path: "/projects/:projectId",
    element: <ProjectPage />,

  }
  ,{
    path: "/projects/:projectId/notes/:noteId",
    element: <NotePage />,
  }
  ,{
    path: "/projects/:projectId/structure",
    element: (
      <BreadcrumbProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RepoStructure />
        </Suspense>
      </BreadcrumbProvider>
    ),
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={WebRouter} />
    </>
  );
}

export default App;
