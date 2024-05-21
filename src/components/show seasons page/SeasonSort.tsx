import { useState } from 'react';
import "../../styles/components.css";

interface SearchAndSortSeasonsProps {
  onSort: (criteria: string) => void;
}

const SeasonSort: React.FC<SearchAndSortSeasonsProps> = ({ onSort }) => {
  const [sortInput, setSortInput] = useState<string>('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.target.value;
    setSortInput(criteria);
    onSort(criteria);
  };

  return (
    <form className="search--wrapper" onSubmit={(e) => e.preventDefault()}>
      <select value={sortInput} onChange={handleSortChange}>
        <option value="">Seasons</option>
        <option value="most-recent">Most recent</option>
        <option value="oldest">Oldest</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </form>
  );
};

export default SeasonSort;
