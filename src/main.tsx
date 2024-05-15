import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([{
//   path: '/',
//   element: <App />,
//   errorElement: <h1>404 not found</h1>
// }]);

// Type 'any' to avoid TS error
const container: any = document.getElementById("root");
const root = createRoot(container);

/**
 * Not that the logic below is created by the Vite build tool automatically, and
 * serves as the entry-point for all code used in the build process.
 */
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
