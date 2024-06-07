import "../../styles/components.css"

const SkeletonCard: React.FC = () => {
    return (
        <div className="skeleton--card">
            <div className="skeleton--image"></div>
            <div className="skeleton--title"></div>
            <div className="skeleton--description"></div>
        </div>
    );
}

export default SkeletonCard;
