import "../../styles/components.css";
import WatchedIcon from "../show seasons page/WatchedIcon";
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
            .select('episode_title')
            .eq('user_id', userId)
            .eq('episode_title', title);

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
    }, [title]);

    const { dispatch } = useAudioPlayer();

    const handlePlay = () => {
        dispatch({ type: 'SET_TRACK', payload: {track: audio, title: header }});
        dispatch({ type: 'PLAY' });
        dispatch({ type: 'RECORD_WATCH_HISTORY', payload: { episodeTitle: title, episodeId: episodeId, userId } });
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
