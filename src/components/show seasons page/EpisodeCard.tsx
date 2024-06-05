import "../../styles/components.css";
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useState, useEffect } from "react";
import supabase from "../../supabaseConfig";
import FavoriteIcon from "./FavouriteIcon";
import FavoriteBorderIcon from "./FavouriteBorderIcon";
import WatchedIcon from "./WatchedIcon";

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface EpisodeCardProps {
  episode: Episode;
  podcast_title: string;
  season_id: number;
  season_title: string;
  podcast_image: string;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, podcast_title, season_id, season_title, podcast_image }) => {
  const [favourite, setFavourite] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const { dispatch } = useAudioPlayer();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        checkIfFavourite(user.id);
        checkIfWatched(user.id);
      }
    };

    const checkIfFavourite = async (userId: string) => {
      const { data, error } = await supabase
        .from('favourites')
        .select('title')
        .eq('user_id', userId)
        .eq('title', episode.title);
      
      if (error) {
        console.error('Error checking favourite status:', error.message);
        return;
      }

      if (data && data.length > 0) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    };

    const checkIfWatched = async (userId: string) => {
      const { data, error } = await supabase
        .from('watch_history')
        .select('episode_title')
        .eq('user_id', userId)
        .eq('episode_title', episode.title);

      if (error) {
        console.error('Error checking watched status:', error.message);
        return;
      }

      if (data && data.length > 0) {
        setWatched(true);
      } else {
        setWatched(false);
      }
    };

    fetchUser();
  }, [episode.title]);

  useEffect(() => {
    setWatched(false); // Reset watched state when episode changes
  }, [episode.title]);

  const header = `${podcast_title}: ${episode.title}`;

  const handlePlay = () => {
    if (userId) {
      dispatch({ type: 'SET_TRACK', payload: { track: episode.file, title: header } });
      dispatch({ type: 'PLAY' });
      dispatch({ type: 'RECORD_WATCH_HISTORY', payload: { episodeTitle: episode.title, episodeId: episode.episode, userId } });
    } else {
      console.error('User not logged in');
    }
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
              podcast_image: podcast_image,
              season_title: season_title,
              season_id: season_id,
              episode_id: episode.episode,
              title: episode.title,
              description: episode.description,
              file: episode.file,
            }
          ]);

        if (error) {
          throw error;
        }

      } catch (error) {
        if (error instanceof Error) {
          console.error('Error adding episode to favourites:', error.message);
        } else {
          console.error('Unexpected error', error);
        }
      }
    } else {
      try {
        const { error } = await supabase
          .from('favourites')
          .delete()
          .eq('title', episode.title)
          .eq('user_id', userId);

        if (error) {
          throw error;
        }

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
        {watched && <WatchedIcon />}
      </div>
    </div>
  );
};

export default EpisodeCard;
