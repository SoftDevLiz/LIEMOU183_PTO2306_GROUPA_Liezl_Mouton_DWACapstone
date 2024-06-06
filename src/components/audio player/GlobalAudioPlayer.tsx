import { useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import supabase from '../../supabaseConfig';

const GlobalAudioPlayer: React.FC = () => {
  const { state, dispatch } = useAudioPlayer();
  const audioRef = useRef<AudioPlayer>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user ID:', error.message);
      } else {
        setUserId(user?.id || null);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (audioRef.current && state.currentTrack) {
      audioRef.current.audio.current!.currentTime = state.currentTime;
    }
  }, [state.currentTrack, state.currentTime]);

  const handlePause = () => {
    if (userId && state.episodeTitle) {
      const episodeTitle = state.episodeTitle.split(': ').pop() || state.episodeTitle; // Extract original episode title
      dispatch({
        type: 'RECORD_WATCH_HISTORY',
        payload: { currentTime: audioRef.current?.audio.current?.currentTime || state.currentTime, episodeTitle, episodeId: 1, userId }
      });
    }
    dispatch({ type: 'PAUSE' });
  };

  const handleTimeUpdate = (e: any) => {
    dispatch({ type: 'SET_TIME', payload: e.target.currentTime });
  };

  const handleEnded = () => {
    if (userId && state.episodeTitle) {
      const episodeTitle = state.episodeTitle.split(': ').pop() || state.episodeTitle; // Extract original episode title
      dispatch({
        type: 'RECORD_WATCH_HISTORY',
        payload: { currentTime: audioRef.current?.audio.current?.currentTime || state.currentTime, episodeTitle, episodeId: 1, userId }
      });
    }
    dispatch({ type: 'PAUSE' });
  };

  return (
    <div className='audio--player'>
      <AudioPlayer
        header={state.episodeTitle || ''}
        ref={audioRef}
        autoPlay={state.isPlaying}
        src={state.currentTrack || ''}
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
