import "../../styles/components.css"
import FavouriteEpisodeCard from "./FavouriteEpisodeCard"
import { useState, useEffect} from "react"
import supabase from "../../supabaseConfig"

const FavouritesDashboard: React.FC = () => {
    const [favourites, setFavourites] = useState<[]>([])
    const [userId, setUserId] = useState<string | null>(null)
    const [selectedTitle, setSelectedTitle] = useState<[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        
        const fetchFavourites = async () => {
            const { data: fetchedFavourites, error } = await supabase
                .from('favourites')
                .select('*')
                .eq('user_id', userId);
            
            if (error) {
                console.error('Error fetching favourites:', error.message);
                return;
            }
            
            setFavourites(fetchedFavourites || []);
        };

        fetchUser()
    
        if (userId) {
            fetchFavourites();
        }

    }, [userId]);


    const handleSelect = (selectedTitle: string) => {
        const episodesForSelectedTitle = favourites.filter(favourite => favourite.podcast_title === selectedTitle);
        setSelectedTitle(episodesForSelectedTitle);
    };

    const handleDelete = (deletedTitle: string) => {
        const updatedFavourites = favourites.filter(favourite => favourite.title !== deletedTitle);
        const updatedSelectedTitle = selectedTitle.filter(favourite => favourite.title !== deletedTitle);
        setFavourites(updatedFavourites);
        setSelectedTitle(updatedSelectedTitle);
    };
    
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <select onChange={(e) => handleSelect(e.target.value)}>
                    <option value="">Select a show</option>
                    {Array.from(new Set(favourites.map(favourite => favourite.podcast_title))).map((podcastTitle, index) => (
                        <option key={index} value={podcastTitle}>{podcastTitle}</option>
                    ))}
                </select>
            </form>
            <div>
                {selectedTitle.map((episode) => {
                    return (
                        <FavouriteEpisodeCard 
                            key={episode.episode_id}
                            season={episode.season_title}
                            added={episode.created_at}
                            episodeId={episode.episode_id}
                            title={episode.title} 
                            desc={episode.description}
                            audio={episode.file}
                            onDelete={() => handleDelete(episode.title)}
                        />
                    )
                })}
            </div>
        </>
    );
}

export default FavouritesDashboard;