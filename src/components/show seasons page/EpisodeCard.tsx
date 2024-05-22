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
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <div className="card--wrapper">
      <div className="card--info">
        <h3 className="card--title">Episode {episode.episode}: {episode.title}</h3>
        <p className="card--description">{episode.description}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
