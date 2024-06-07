import "../../styles/components.css";
import WatchedIcon from "../showSeasonsPage/WatchedIcon";
import { useState, useEffect } from "react";
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import supabase from "../../supabaseConfig";

interface FavouriteEpisodeProps {
    key: number,
    show: string,
    season_id: number;
    season: string,
    added: any,
    episodeId: number,
    title: string,
    desc: string,
    audio: string,
    onDelete: () => void,
}

const FavouriteEpisodeCard: React.FC<FavouriteEpisodeProps> = ({ show, season_id, season, added, episodeId, title, desc, audio, onDelete }) => {
    const [userId, setUserId] = useState<string>("");
    const [watched, setWatched] = useState<boolean>(false);
    const [timestamp, setTimestamp] = useState<number>(0);

    const header = `${show}: ${title}`;

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const userId = user.id;
                setUserId(userId);
                checkIfWatched(userId);
            }
        };

        const checkIfWatched = async (userId: string) => {
          const { data, error } = await supabase
            .from('watch_history')
            .select('timestamp')
            .eq('user_id', userId)
            .eq('episode_title', title)
            .order('timestamp', { ascending: false })
            .limit(1);
    
          if (error) {
            console.error('Error checking watched status:', error.message);
            return;
          }
    
          if (data && data.length > 0) {
            if (data[0].timestamp > 42) {
              setWatched(true);
            } else {
              setTimestamp(data[0].timestamp);
            }
          }
        };
    
        fetchUser();
      }, [title]);

    const { dispatch } = useAudioPlayer();

    const handlePlay = () => {
      if (userId) {
        dispatch({ type: 'PLAY', payload: { track: audio, title: header, currentTime: timestamp } });
      } else {
        console.error('User not logged in');
      }
    };
      
    const deleteFavourite = async () => {
        const { error } = await supabase
          .from('favourites')
          .delete()
          .eq('title', title)
          .eq('user_id', userId);

        if (error) {
            console.error(error);
        } else {
            onDelete(); 
        }
    }

    const date = new Date(added).toLocaleString();

    return (
        <div className="fave--episode--wrapper">
            <div className="fave--title--wrapper">
                <h3 className="card--title">{title}</h3>
                <button className="play--button" onClick={handlePlay}></button>
                <button className="delete--button" onClick={deleteFavourite}></button>
            </div>
            <h4>Season {season_id}: {season}</h4>
            <h4>Episode {episodeId}</h4>
            <p className="card--description">{desc}</p>
            <div className="fave--watched--wrapper">
                <h4 className="fave--date--added">Added on {date}</h4>
                {watched && <WatchedIcon />}
            </div>
        </div>
    )
};

export default FavouriteEpisodeCard;
