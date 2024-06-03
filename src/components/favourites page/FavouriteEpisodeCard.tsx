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
}

const FavouriteEpisodeCard: React.FC<FavouriteEpisodeProps> = ({ season, added, episodeId, title, desc, audio }) => {
    const [favourite, setFavourite] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setUserId(user.id);
            checkIfFavourite(user.id);
          }
        };
    
        const checkIfFavourite = async (userId: string) => {
          const { data, error } = await supabase
            .from('favourites')
            .select('title')
            .eq('user_id', userId)
            .eq('title', title);
          
          if (error) {
            console.error('Error checking favourite status:', error.message);
            return;
          }
    
          if (data && data.length > 0) {
            setFavourite(true);
          }
        };
    
        fetchUser();
      }, [title]);

      const { dispatch } = useAudioPlayer();

      const handlePlay = () => {
        dispatch({ type: 'SET_TRACK', payload: audio });
        dispatch({ type: 'PLAY' });
      };
    

    return (
        <div className="card--info">
        <div className="title--wrapper">
          <h3 className="card--title">Episode {episodeId}: {title}</h3>
          <button className="play--button" onClick={handlePlay}></button>
          <button className="delete--button"></button>
        </div>
        <h4>Added on {added}</h4>
        <h4>Season: {season}</h4>
        <p className="card--description">{desc}</p>
      </div>
    )
};

export default FavouriteEpisodeCard;