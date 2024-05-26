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
        <div className="title--wrapper">
          <h3 className="card--title">Episode {episode.episode}: {episode.title}</h3>
          <button onClick={handlePlay}>
            <div className="play--icon"></div>
          </button>
        </div>
        <p className="card--description">{episode.description}</p>
      </div>
      
    </div>
  );
};

export default EpisodeCard;
