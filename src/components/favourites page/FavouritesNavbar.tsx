import "../../styles/components.css"
import ShareButton from "./ShareButton";

const FavouritesNavbar: React.FC<{}> = () => {
    return (
        <>
        <div className="navbar">
            <div className="fave--navbar--wrapper">
                <h1 className="navbar--title">Favourites</h1>
                <ShareButton />
            </div>
            <h2>Explore your favourite episodes</h2>
        </div>
        </>
    )
}

export default FavouritesNavbar;