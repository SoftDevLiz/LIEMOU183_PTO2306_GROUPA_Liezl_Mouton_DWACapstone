import "../../styles/components.css"
import SearchAndSortHome from "./SearchAndSortHome";

const Navbar: React.FC<{}> = () => {
    return (
        <>
        <div className="navbar">
            <h1 className="navbar--title">Home</h1>
            <h2>Explore new shows</h2>
        </div>
        <SearchAndSortHome />
        </>
    )
}

export default Navbar;