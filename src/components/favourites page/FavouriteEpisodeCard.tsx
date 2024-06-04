import "../../styles/components.css"
import { useState, useEffect } from "react";
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import supabase from "../../supabaseConfig";

interface FavouriteEpisodeProps {
    key: number,
    season: string,
    added: any,
    episodeId: number,
    title: string,
    desc: string,
    audio: string,
    onDelete: () => void,
}

const FavouriteEpisodeCard: React.FC<FavouriteEpisodeProps> = ({ season, added, episodeId, title, desc, audio, onDelete }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        fetchUser();
    });

      const { dispatch } = useAudioPlayer();

      const handlePlay = () => {
        dispatch({ type: 'SET_TRACK', payload: audio });
        dispatch({ type: 'PLAY' });
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
        <h4>Season: {season}</h4>
        <h4>Episode {episodeId}</h4>
        <p className="card--description">{desc}</p>
        <h4 className="fave--date--added">Added on {date}</h4>
      </div>
    )
};

export default FavouriteEpisodeCard;