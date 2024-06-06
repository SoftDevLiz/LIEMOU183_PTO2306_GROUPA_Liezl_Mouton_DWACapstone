import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import supabase from '../supabaseConfig';

// The shape of the state
type AudioPlayerState = {
  currentTrack: string | null;
  currentTime: number;
  isPlaying: boolean;
  episodeTitle: string | null;
};

// The actions that can modify the state
type AudioPlayerAction = 
  | { type: 'SET_TIME'; payload: number }
  | { type: 'PLAY'; payload: { track: string, title: string, currentTime: number } }
  | { type: 'PAUSE' }
  | { type: 'RECORD_WATCH_HISTORY'; payload: { currentTime: number, episodeTitle: string, episodeId: number, userId: string } };

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
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'PLAY':
      return { 
        ...state, 
        currentTrack: action.payload.track, 
        currentTime: action.payload.currentTime, 
        isPlaying: true, 
        episodeTitle: action.payload.title 
      };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'RECORD_WATCH_HISTORY':
      console.log('Dispatching RECORD_WATCH_HISTORY with payload:', action.payload);
      recordWatchHistory(action.payload);
      return state;
    default:
      return state;
  }
};

// Function to record the watch history in Supabase
const recordWatchHistory = async (payload: { currentTime: number, episodeTitle: string, episodeId: number, userId: string }) => {
  console.log('Recording watch history in Supabase with payload:', payload);
  const { error } = await supabase
    .from('watch_history')
    .upsert({
      episode_title: payload.episodeTitle,
      episode_id: payload.episodeId,
      user_id: payload.userId,
      timestamp: payload.currentTime,
    });

  if (error) {
    console.error('Error recording watch history:', error.message);
  }
};

interface AudioPlayerProviderProps {
  children: ReactNode;
}

// Provider component
export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(audioPlayerReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('audioPlayerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      console.log('Restoring audio player state from localStorage:', parsedState);
      dispatch({ type: 'PLAY', payload: { track: parsedState.currentTrack, title: parsedState.episodeTitle, currentTime: parsedState.currentTime } });
      dispatch({ type: 'SET_TIME', payload: parsedState.currentTime });
      parsedState.isPlaying ? dispatch({ type: 'PLAY', payload: { track: parsedState.currentTrack, title: parsedState.episodeTitle, currentTime: parsedState.currentTime  } }) : dispatch({ type: 'PAUSE' });
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('audioPlayerState', JSON.stringify(state));
      console.log('Saving audio player state to localStorage:', state);
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
