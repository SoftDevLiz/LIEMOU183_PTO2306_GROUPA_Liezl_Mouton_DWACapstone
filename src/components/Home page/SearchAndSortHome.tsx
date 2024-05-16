import { useState } from 'react';
import "../../styles/components.css";

interface SearchAndSortHomeProps {
  onSearch: (term: string) => void;
  onSort: (criteria: string) => void;
}

const SearchAndSortHome: React.FC<SearchAndSortHomeProps> = ({ onSearch, onSort }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [sortInput, setSortInput] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchInput(term);
    onSearch(term);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.target.value;
    setSortInput(criteria);
    onSort(criteria);
  };

  return (
    <form className="search--wrapper" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearchChange}
        className="search--bar"
      />
      <select value={sortInput} onChange={handleSortChange}>
        <option value="">Filter by</option>
        <option value="most-recent">Most recent</option>
        <option value="oldest">Oldest</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </form>
  );
};

export default SearchAndSortHome;
