import React from "react";
// import App from "./App";
import Landing from "./components/Landing page/Landing";
import Home from "./components/Home page/Home";
import Err404 from "./components/Error page/Err404";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <Landing />,
  errorElement: <Err404 />
}, 
{
  path: '/Home',
  element: <Home />,
  errorElement: <Err404 />
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
