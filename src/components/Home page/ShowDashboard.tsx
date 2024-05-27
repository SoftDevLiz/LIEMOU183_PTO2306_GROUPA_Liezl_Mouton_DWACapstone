import { useState, useEffect } from 'react';
import ShowList from './ShowList';
import SearchAndSortHome from './SearchAndSortHome';
import SkeletonCard from './SkeletonShowListCard';
import "../../styles/components.css";
import genreMap from "../../utils/genreMap";

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: string[];
  updated: string;
}

const groupShowsByGenre = (shows: Show[]) => {
  const groupedShows: { [key: string]: Show[] } = {};

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

  const getFilteredAndSortedShows = () => {
    let filteredShows = showData.filter(show =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'most-recent':
        filteredShows = filteredShows.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        break;
      case 'oldest':
        filteredShows = filteredShows.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
        break;
      case 'a-z':
        filteredShows = filteredShows.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        filteredShows = filteredShows.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filteredShows;
  };

  const filteredAndSortedShows = getFilteredAndSortedShows();
  const groupedShows = sortCriteria === 'genre' ? groupShowsByGenre(filteredAndSortedShows) : undefined;

  return (
    <div>
      <div>
        <SearchAndSortHome onSearch={handleSearch} onSort={handleSort} />
        {loading ? (
          <div className="home--skeleton--wrapper">
            {Array.from({ length: 100 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <ShowList groupedShows={groupedShows} shows={sortCriteria !== 'genre' ? filteredAndSortedShows : undefined} />
        )}
      </div>
    </div>
  );
};

export default ShowContainer;
