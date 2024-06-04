import "../../styles/components.css";
import FavouriteEpisodeCard from "./FavouriteEpisodeCard";
import { useState, useEffect } from "react";
import supabase from "../../supabaseConfig";

interface Favourite {
  id: number;
  user_id: number;
  podcast_title: string;
  podcast_image: string;
  season_title: string;
  created_at: string;
  episode_id: number;
  title: string;
  description: string;
  file: string;
}

const FavouritesDashboard: React.FC = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<Favourite[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

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

      setFavourites(fetchedFavourites);
    };

    fetchUser();

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

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    let filteredEpisodes = [...selectedTitle]; 
  
    switch (filter) {
      case "most-recent":
        filteredEpisodes.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        filteredEpisodes.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "a-z":
        filteredEpisodes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filteredEpisodes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  
    setSelectedTitle(filteredEpisodes); 
  }, [filter, selectedTitle]);

  
  return (
    <>
      <form className="fave--form" onSubmit={(e) => e.preventDefault()}>
        <select onChange={(e) => handleSelect(e.target.value)}>
          <option value="">Select a show</option>
          {Array.from(new Set(favourites.map(favourite => favourite.podcast_title))).map((podcastTitle, index) => (
            <option key={index} value={podcastTitle}>{podcastTitle}</option>
          ))}
        </select>
        <select value={filter} onChange={handleFilter}>
          <option value="">Filter by</option>
          <option value="most-recent">Most recent</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </form>
      <div>
        {selectedTitle.length > 0 && (
          <>
            <h2 className="fave--show--title">{selectedTitle[0].podcast_title}</h2>
            <img src={selectedTitle[0].podcast_image} className="fave--hero" alt={selectedTitle[0].podcast_title} />
          </>
        )}
        {selectedTitle.map((episode, index) => (
          <FavouriteEpisodeCard
            key={index}
            season={episode.season_title}
            added={episode.created_at}
            episodeId={episode.episode_id}
            title={episode.title}
            desc={episode.description}
            audio={episode.file}
            onDelete={() => handleDelete(episode.title)}
          />
        ))}
      </div>
    </>
  );
};

export default FavouritesDashboard;
