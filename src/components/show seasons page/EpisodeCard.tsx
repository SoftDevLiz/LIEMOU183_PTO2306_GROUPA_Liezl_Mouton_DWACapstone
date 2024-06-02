import "../../styles/components.css";
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useState, useEffect } from "react";
import supabase from "../../supabaseConfig";
import FavoriteIcon from "./FavouriteIcon";
import FavoriteBorderIcon from "./FavouriteBorderIcon";

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}



interface EpisodeCardProps {
  episode: Episode;
  podcast_title: string;
  season_title: string;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, podcast_title, season_title }) => {
  const [favourite, setFavourite] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  const { dispatch } = useAudioPlayer();

  const handlePlay = () => {
    dispatch({ type: 'SET_TRACK', payload: episode.file });
    dispatch({ type: 'PLAY' });
  };

  const handleFavourite = async () => {
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    setFavourite(prevFavourite => !prevFavourite);

    if (!favourite) {
      try {
        const { error } = await supabase
          .from('favourites')
          .insert([
            {
              user_id: userId,
              podcast_title: podcast_title,
              season_title: season_title,
              episode_id: episode.episode,
              title: episode.title,
              description: episode.description,
              file: episode.file,
            }
          ]);

        if (error) {
          throw error;
        }

        console.log('Episode added to favourites');
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error adding episode to favourites:', error.message);
        } else {
          console.error('Unexpected error', error);
        }
      }
    } else {
      try {
        console.log('Attempting to remove favourite with title:', episode.title);
        console.log('Attempting to remove favourite with user_id:', userId);

        const { error } = await supabase
          .from('favourites')
          .delete()
          .eq('title', episode.title);

        if (error) {
          throw error;
        }
        console.log('Episode removed from favourites');
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error removing episode from favourites:', error.message);
        } else {
          console.error('Unexpected error', error);
        }
      }
    }
  };

  return (
    <div className="card--wrapper">
      <div className="card--info">
        <div className="title--wrapper">
          <h3 className="card--title">Episode {episode.episode}: {episode.title}</h3>
          <button className="play--button" onClick={handlePlay}></button>
          <button className="favourite--button" onClick={handleFavourite}>
          {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
        </div>
        <p className="card--description">{episode.description}</p>
      </div>
      
    </div>
  );
};

export default EpisodeCard;
