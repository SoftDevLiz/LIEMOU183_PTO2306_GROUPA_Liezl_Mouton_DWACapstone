import React from "react";
// import App from "./App";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <Landing />,
  errorElement: 
}, 
{
  path: '/Home',
  element: <Home />,
  errorElement: <h1>404 not found</h1>
}
]);

// Type 'any' to avoid TS error
const container: any = document.getElementById("root");
const root = createRoot(container);

/**
 * Not that the logic below is created by the Vite build tool automatically, and
 * serves as the entry-point for all code used in the build process.
 */
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);
