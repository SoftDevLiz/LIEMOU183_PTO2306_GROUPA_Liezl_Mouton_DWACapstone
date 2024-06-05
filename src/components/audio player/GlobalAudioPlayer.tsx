import { useState, useEffect, useRef } from 'react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import supabase from '../../supabaseConfig';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const GlobalAudioPlayer: React.FC = () => {
  const { state, dispatch } = useAudioPlayer();
  const audioRef = useRef<AudioPlayer>(null);
  const [userId, setUserId] = useState<string>("");

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id)
    }
  }

  fetchUser();

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

    if (userId && state.episodeTitle) {
      dispatch({
        type: 'RECORD_WATCH_HISTORY',
        payload: { currentTime: state.currentTime, episodeTitle: state.episodeTitle, episodeId: 1, userId }
      });
    }
  };

  const handleTimeUpdate = (e: any) => {
    dispatch({ type: 'SET_TIME', payload: e.target.currentTime });
  };

  const handleEnded = () => {
    dispatch({ type: 'PAUSE' });

    if (userId && state.episodeTitle) {
      dispatch({
        type: 'RECORD_WATCH_HISTORY',
        payload: { currentTime: state.currentTime, episodeTitle: state.episodeTitle, episodeId: 1, userId }
      });
    }
  };

  return (
    <div className='audio--player'>
      <AudioPlayer
        header={state.episodeTitle || ''}
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
