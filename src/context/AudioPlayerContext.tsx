import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import supabase from '../supabaseConfig';

// The shape of the state
type AudioPlayerState = {
  currentTrack: string | null;
  currentTime: number;
  isPlaying: boolean;
  episodeTitle: string | null; // Add episodeTitle to the state
};

// The actions that can modify the state
type AudioPlayerAction = 
  | { type: 'SET_TRACK'; payload: { track: string, title: string } }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'RECORD_WATCH_HISTORY'; payload: { episodeTitle: string, episodeId: number, userId: string } };

// The initial state when the app first loads which takes the shape of "AudioPlayerState"
const initialState: AudioPlayerState = {
  currentTrack: null,
  currentTime: 0,
  isPlaying: false,
  episodeTitle: null,
};

// Create the context with a default value of undefined
const AudioPlayerContext = createContext<{ state: AudioPlayerState; dispatch: React.Dispatch<AudioPlayerAction> } | undefined>(undefined);

// Reducer function: Handles state changes based on the dispatched actions
const audioPlayerReducer = (state: AudioPlayerState, action: AudioPlayerAction): AudioPlayerState => {
  switch (action.type) {
    case 'SET_TRACK':
      return { ...state, currentTrack: action.payload.track, currentTime: 0, isPlaying: true, episodeTitle: action.payload.title };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'RECORD_WATCH_HISTORY':
      recordWatchHistory(action.payload.episodeTitle, action.payload.episodeId, action.payload.userId);
      return state;
    default:
      return state;
  }
};

// Function to record the watch history in Supabase
const recordWatchHistory = async (episodeTitle: string, episodeId: number, userId: string) => {
  const { error } = await supabase
    .from('watch_history')
    .upsert({
      episode_title: episodeTitle,
      episode_id: episodeId, 
      user_id: userId, 
    });

  if (error) {
    console.error('Error recording watch history:', error.message);
  }
};

interface AudioPlayerProviderProps {
  children: ReactNode;
}

// Provider component: Wraps child components and uses useReducer to create state and dispatch function and then provides them to the context.
export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(audioPlayerReducer, initialState);

  // Load state from localStorage when component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('audioPlayerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch({ type: 'SET_TRACK', payload: { track: parsedState.currentTrack, title: parsedState.episodeTitle } });
      dispatch({ type: 'SET_TIME', payload: parsedState.currentTime });
      parsedState.isPlaying ? dispatch({ type: 'PLAY' }) : dispatch({ type: 'PAUSE' });
    }
  }, []);

  // Save state to localStorage when component unmounts or before tab is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('audioPlayerState', JSON.stringify(state));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [state]);
  
  return (
    <AudioPlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

// Custom hook: Makes it easy to access the audio player state and dispatch function.
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
