import React from 'react';
import "../../styles/components.css";

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onPlay }) => {
  const handlePlayClick = () => {
    onPlay(episode);
  };

  return (
    <div className="card--wrapper">
      <div className="card--info">
        <h3 className="card--title">Episode {episode.episode}: {episode.title}</h3>
        <button onClick={handlePlayClick}>Play</button>
        <p className="card--description">{episode.description}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
