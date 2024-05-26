import { useEffect, useRef } from 'react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const GlobalAudioPlayer: React.FC = () => {
    const { state, dispatch } = useAudioPlayer();
    const audioRef = useRef<AudioPlayer>(null);
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.audio.current!.currentTime = state.currentTime;
      }
    }, [state.currentTime]);
  
    const handlePlay = () => {
      dispatch({ type: 'PLAY' });
    };
  
    const handlePause = () => {
      dispatch({ type: 'PAUSE' });
    };
  
    const handleTimeUpdate = (e: any) => {
      dispatch({ type: 'SET_TIME', payload: e.target.currentTime });
    };
  
    const handleEnded = () => {
      dispatch({ type: 'PAUSE' });
    };
  
    return (
      <div className='audio--player'>
        <AudioPlayer
          ref={audioRef}
          autoPlay={state.isPlaying}
          src={state.currentTrack || ''}
          onPlay={handlePlay}
          onPause={handlePause}
          onListen={handleTimeUpdate}
          onEnded={handleEnded}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          showJumpControls={false}
        />
      </div>
    );
  };
  
  export default GlobalAudioPlayer;