 import React from "react";
import LandingPage from "./components/landing page/LandingPage";
import HomePage from "./components/home page/HomePage";
import Err404Page from "./components/error page/Err404Page";
import ShowDetailsPage from "./components/show details page/ShowDetailsPage";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <LandingPage />,
  errorElement: <Err404Page />
}, 
{
  path: '/home',
  element: <HomePage />,
  errorElement: <Err404Page />
},
{
  path: '/show/:id',
  element: <ShowDetailsPage />,
  errorElement: <Err404Page />
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
