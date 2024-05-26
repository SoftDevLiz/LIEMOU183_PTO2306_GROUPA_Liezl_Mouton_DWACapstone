import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from './routerConfig'; // Import the routes array
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import GlobalAudioPlayer from './components/audio player/GlobalAudioPlayer';

const App: React.FC = () => {
  const location = useLocation();
  const routing = useRoutes(routes); // Use the routes array with useRoutes

  // Define the paths where the audio player should be displayed
  const pathsWithAudioPlayer = ['/Home', '/show/:id', '/show/:id/seasons'];

  const shouldDisplayAudioPlayer = pathsWithAudioPlayer.some(path => 
    new RegExp(`^${path.replace(/:[^\s/]+/g, '([^/]+)')}$`).test(location.pathname)
  );

  return (
    <AudioPlayerProvider>
      {routing}
      {shouldDisplayAudioPlayer && <GlobalAudioPlayer />}
    </AudioPlayerProvider>
  );
};

export default App;
