import { useState, useEffect } from 'react';
import ShowList from './ShowList';
import SearchAndSortHome from './SearchAndSortHome';
import SkeletonCard from './SkeletonShowListCard';
import "../../styles/components.css";
import genreMap from "../../utils/genreMap";
import { createFuzzySearch, searchWithFuzzy } from '../../utils/fuzzySearch';
import Fuse from 'fuse.js';

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: string[];
  updated: string;
}

const groupShowsByGenre = (shows: Show[]): { [genre: string]: Show[] } => {
  const groupedShows: { [genre: string]: Show[] } = {};

  shows.forEach(show => {
    show.genres.forEach(genreId => {
      const genre = genreMap[genreId];
      if (genre) {
        if (!groupedShows[genre]) {
          groupedShows[genre] = [];
        }
        groupedShows[genre].push(show);
      }
    });
  });

  return groupedShows;
};

const ShowContainer: React.FC<{}> = () => {
  const [showData, setShowData] = useState<Show[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fuse, setFuse] = useState<Fuse<Show> | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setShowData(jsonData);

        // Initialize Fuse.js search
        setFuse(createFuzzySearch(jsonData));

        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const getFilteredAndSortedShows = (): { groupedShows?: { [genre: string]: Show[] }; shows?: Show[] } => {
    const filteredShows = searchTerm ? searchWithFuzzy(fuse, searchTerm, showData) : showData;

    switch (sortCriteria) {
      case 'most-recent':
        filteredShows.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        break;
      case 'oldest':
        filteredShows.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
        break;
      case 'a-z':
        filteredShows.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        filteredShows.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'genre':
        return { groupedShows: groupShowsByGenre(filteredShows) };
      default:
        return { shows: filteredShows };
    }

    // Default case to avoid TypeScript error, return undefined
    return { shows: filteredShows };
  };

  const filteredAndSortedShows = getFilteredAndSortedShows();

  return (
    <div>
      <SearchAndSortHome onSearch={handleSearch} onSort={handleSort} />
      {loading ? (
        <div className="home--skeleton--wrapper">
          {Array.from({ length: 100 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <ShowList
          groupedShows={filteredAndSortedShows.groupedShows}
          shows={filteredAndSortedShows.shows}
        />
      )}
    </div>
  );
};

export default ShowContainer;
