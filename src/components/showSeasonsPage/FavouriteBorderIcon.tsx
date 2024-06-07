import "../../styles/components.css";
import emptyStar from "../../assets/icons/emptystar.png"

const FavoriteBorderIcon: React.FC = () => {

    return (
        <>
        <img className="favourite--icon" src={emptyStar} />
        </>
    )

}

export default FavoriteBorderIcon;