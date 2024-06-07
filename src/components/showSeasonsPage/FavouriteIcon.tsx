import "../../styles/components.css";
import favouriteStar from "../../assets/icons/favourtitestar.png"

const FavoriteIcon: React.FC = () => {

    return (
        <>
        <img className="favourite--icon" src={favouriteStar} />
        </>
    )

}

export default FavoriteIcon;