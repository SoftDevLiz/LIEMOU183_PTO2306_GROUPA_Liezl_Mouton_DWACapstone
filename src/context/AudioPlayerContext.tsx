import { createContext, useContext, useReducer, useEffect} from 'react';

// The shape of the state
type AudioPlayerState = {
  currentTrack: string | null;
  currentTime: number;
  isPlaying: boolean;
};

// The actions that can modify the state
type AudioPlayerAction = 
  | { type: 'SET_TRACK'; payload: string }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' };

// The initial states when the app first loads which takes the shape of "AudioPlayerState"
const initialState: AudioPlayerState = {
  currentTrack: null,
  currentTime: 0,
  isPlaying: false,
};

// Creates the context with a default value of undefined
const AudioPlayerContext = createContext<{ state: AudioPlayerState; dispatch: React.Dispatch<AudioPlayerAction> } | undefined>(undefined);

// Reducer function: Handles state changes based on the dispatched actions. It takes the current state and an action then returns a new state based on the action type.
const audioPlayerReducer = (state: AudioPlayerState, action: AudioPlayerAction): AudioPlayerState => {
  switch (action.type) {
    case 'SET_TRACK':
      return { ...state, currentTrack: action.payload, currentTime: 0, isPlaying: true };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    default:
      return state;
  }
};

// Provider component: Wraps child components and uses useReducer to create state and dispatch function and then provides them to the context.
export const AudioPlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(audioPlayerReducer, initialState);

   // Persist state to localStorage
   useEffect(() => {
    const savedState = localStorage.getItem('audioPlayerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch({ type: 'SET_TRACK', payload: parsedState.currentTrack });
      dispatch({ type: 'SET_TIME', payload: parsedState.currentTime });
      parsedState.isPlaying ? dispatch({ type: 'PLAY' }) : dispatch({ type: 'PAUSE' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('audioPlayerState', JSON.stringify(state));
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


