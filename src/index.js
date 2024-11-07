import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import JobCategoryPage from "./components/JobCategoryPage";
import JobDetailsPage from "./components/JobDetailsPage";
import JobListingsPage from "./components/JobListingsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/JobCategoryPage",
    element: <JobCategoryPage />,
  },
  {
    path: "/JobDetailsPage/:jobId",
    element: <JobDetailsPage />,
  },
  {
    path: "/JobListingsPage",
    element: <JobListingsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
