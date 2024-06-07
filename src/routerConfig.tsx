import LandingPage from '../src/components/landing page/LandingPage';
import HomePage from '../src/components/home page/HomePage';
import Err404Page from '../src/components/error page/Err404Page';
import ShowDetailsPage from '../src/components/show details page/ShowDetailsPage';
import ShowSeasonsPage from '../src/components/show seasons page/ShowSeasonsPage';
import FavouritesPage from '../src/components/favourites page/FavouritesPage';
import ShareableFavePage from '../src/components/shareable favourites page/ShareableFavePage';


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
