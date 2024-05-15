const SearchAndSortHome: React.FC<{}> = () => {
    return (
        <form className="search--wrapper">
            <input
                type="text"
                placeholder="Search"
            />
            <select>
                <option value="" disabled selected>Filter by</option>
                <option value="asc">Most recent</option>
                <option value="desc">Oldest</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="">None</option>
            </select>
            <button type="submit">Search</button>
        </form>
    )
};

export default SearchAndSortHome;