import "../../styles/components.css"

const SkeletonCard: React.FC = () => {
    return (
            <div className="home--skeleton--card">
                <div className="home--skeleton--image"></div>
                <div className="home--skeleton--title"></div>
                <div className="home--skeleton--description"></div>
            </div>
    );
}

export default SkeletonCard;