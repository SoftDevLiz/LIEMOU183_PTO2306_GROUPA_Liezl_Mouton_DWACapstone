import LandingPage from './components/landingPage/LandingPage.tsx'
import HomePage from './components/homePage/HomePage.tsx';
import Err404Page from './components/errorPage/Err404Page.tsx';
import ShowDetailsPage from './components/showDetailsPage/ShowDetailsPage.tsx';
import ShowSeasonsPage from './components/showSeasonsPage/ShowSeasonsPage.tsx';
import FavouritesPage from './components/favouritesPage/FavouritesPage.tsx';
import ShareableFavePage from './components/shareableFavouritesPage/ShareableFavePage.tsx';


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
