import LandingPage from './components/landing page/LandingPage';
import HomePage from './components/home page/HomePage';
import Err404Page from './components/error page/Err404Page';
import ShowDetailsPage from './components/show details page/ShowDetailsPage';
import ShowSeasonsPage from './components/show seasons page/ShowSeasonsPage';
import FavouritesPage from './components/favourites page/FavouritesPage';
import ShareableFavePage from './components/shareable favourites page/ShareableFavePage';

export const routes = [
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
  },
  {
    path: '/favourites',
    element: <FavouritesPage />,
    errorElement: <Err404Page />
  },
  {
    path: '/favourites/:userId',
    element: <ShareableFavePage />,
    errorElement: <Err404Page />
  }
];
