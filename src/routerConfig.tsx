import LandingPage from '../src/components/landing page/LandingPage.tsx'
import HomePage from '../src/components/home page/HomePage.tsx';
import Err404Page from '../src/components/error page/Err404Page.tsx';
import ShowDetailsPage from '../src/components/show details page/ShowDetailsPage.tsx';
import ShowSeasonsPage from '../src/components/show seasons page/ShowSeasonsPage.tsx';
import FavouritesPage from '../src/components/favourites page/FavouritesPage.tsx';
import ShareableFavePage from '../src/components/shareable favourites page/ShareableFavePage.tsx';


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
