import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import LandingPage from "./components/landing page/LandingPage";
import HomePage from "./components/home page/HomePage";
import Err404Page from "./components/error page/Err404Page";
import ShowDetailsPage from "./components/show details page/ShowDetailsPage";
import ShowSeasonsPage from "./components/show seasons page/ShowSeasonsPage";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import GlobalAudioPlayer from "./components/audio player/GlobalAudioPlayer" // Import the GlobalAudioPlayer component

const router = createBrowserRouter([
  {
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
  },
  {
    path: '/show/:id/seasons',
    element: <ShowSeasonsPage />,
    errorElement: <Err404Page />
  }
]);

const container: any = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AudioPlayerProvider>
      <RouterProvider router={router} />
      <GlobalAudioPlayer />
    </AudioPlayerProvider>
  </React.StrictMode>
);
