import React from 'react';
import "../../styles/components.css";
import { useAudioPlayer } from '../../context/AudioPlayerContext';

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const { dispatch } = useAudioPlayer();

  const handlePlay = () => {
    dispatch({ type: 'SET_TRACK', payload: episode.file });
    dispatch({ type: 'PLAY' });
  };

  return (
    <div className="card--wrapper">
      <div className="card--info">
        <h3 className="card--title">Episode {episode.episode}: {episode.title}</h3>
        <p className="card--description">{episode.description}</p>
      </div>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default EpisodeCard;
