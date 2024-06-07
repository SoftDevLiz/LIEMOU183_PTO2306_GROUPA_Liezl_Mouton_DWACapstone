import "../../styles/components.css"
import checkmark from "../../assets/icons/checkmark.png"

const WatchedIcon:React.FC = () => {
    return (
        <div className="watched--wrapper">
        <h4>You've watched this </h4>
        <img src={checkmark} />
        </div>
    )
}

export default WatchedIcon;