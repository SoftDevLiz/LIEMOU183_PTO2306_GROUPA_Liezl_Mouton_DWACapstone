import React from 'react';
import { useLocation, RouterProvider } from 'react-router-dom';
import { router } from './routerConfig';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import GlobalAudioPlayer from './components/audio player/GlobalAudioPlayer';

const App: React.FC = () => {
  const location = useLocation();
  
  // Define the paths where the audio player should be displayed
  const pathsWithAudioPlayer = ['/home', '/show/:id', '/show/:id/seasons'];

  const shouldDisplayAudioPlayer = pathsWithAudioPlayer.some(path => 
    new RegExp(`^${path.replace(/:[^\s/]+/g, '([^/]+)')}$`).test(location.pathname)
  );

  return (
    <AudioPlayerProvider>
      <RouterProvider router={router} />
      {shouldDisplayAudioPlayer && <GlobalAudioPlayer />}
    </AudioPlayerProvider>
  );
};

export default App;
