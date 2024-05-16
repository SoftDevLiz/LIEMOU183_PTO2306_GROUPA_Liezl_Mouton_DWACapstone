import { useState } from 'react';
import ShowList from './ShowList';
import SearchAndSortHome from './SearchAndSortHome';
import fetchData from '../../utils/fetchData';
import "../../styles/components.css";

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

const ShowContainer: React.FC<{}> = () => {
  const [showData, setShowData] = useState<Show[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<string>('');

  fetchData(setShowData)

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

  return (
    <div>
      <SearchAndSortHome onSearch={handleSearch} onSort={handleSort} />
      <ShowList shows={getFilteredAndSortedShows()} />
    </div>
  );
};

export default ShowContainer;
