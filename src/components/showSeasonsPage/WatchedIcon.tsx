import "../../styles/components.css"

const WatchedIcon:React.FC = () => {
    return (
        <div className="watched--wrapper">
        <h4>You've watched this </h4>
        <img src="/src/assets/checkmark.png" />
        </div>
    )
}

export default WatchedIcon;