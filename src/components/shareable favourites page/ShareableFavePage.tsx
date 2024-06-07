import "../../styles/components.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import supabase from "../../supabaseConfig";
import ShareableFaveEpisodeCard from "./ShareableFaveEpisodeCard";

const ShareableFavePage: React.FC = () => {
    const [sharedFavourites, setSharedFavourites] = useState<any[]>([]);
    const { userId } = useParams<{ userId: string }>();

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
    
        if (userId) {
          fetchFavourites();
        }
      }, [userId]);

      console.log(sharedFavourites)

    return (
        <div>
            <h1>Favourites from your friend!</h1>
            {sharedFavourites.map((episode, index) => 
            <ShareableFaveEpisodeCard
                key={index}
                userId={userId}
                show={episode.podcast_title}
                title={episode.title}
                season_id={episode.season_id}
                season={episode.season_title}
                episodeId={episode.episode_id}
                desc={episode.description}
                audio={episode.file}
            />)}
        </div>
    )
}

export default ShareableFavePage;