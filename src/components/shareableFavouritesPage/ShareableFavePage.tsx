import "../../styles/components.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabaseConfig";
import ShareableFaveEpisodeCard from "./ShareableFaveEpisodeCard";
import logoDark from "../../assets/icons/logodark.png"

const ShareableFavePage: React.FC = () => {
    const [sharedFavourites, setSharedFavourites] = useState<any[]>([]);
    const { userId } = useParams<{ userId?: string }>();

    useEffect(() => {
        const fetchFavourites = async () => {
          if (!userId) return;
    
          const { data: fetchedFavourites, error } = await supabase
            .from('favourites')
            .select('*')
            .eq('user_id', userId);
    
          if (error) {
            console.error('Error fetching favourites:', error.message);
            return;
          }
          setSharedFavourites(fetchedFavourites);
        };
    
        fetchFavourites();
      }, [userId]);

      const navigateToLanding = () => {
        const baseURL = window.location.origin;
        const path = '/';
        const url = `${baseURL}${path}`;
        window.open(url, '_blank');
      }

    return (
        <div className="shareable--fave--page">
            <div className="shareable--fave--header">
                <img src={logoDark} onClick={navigateToLanding} />
                <h1>Discover, Listen, Connect</h1>
                <h1>Favourites from your friend!</h1>
            </div>
            {sharedFavourites.map((episode, index) =>
                <ShareableFaveEpisodeCard
                    key={index}
                    userId={userId || ''}
                    show={episode.podcast_title}
                    season_id={episode.season_id}
                    season={episode.season_title}
                    episodeId={episode.episode_id}
                    title={episode.title}
                    desc={episode.description}
                    audio={episode.file}
                />
            )}
        </div>
    );
}

export default ShareableFavePage;
