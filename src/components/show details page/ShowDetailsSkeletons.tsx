import "../../styles/components.css"

const ShowDetailsSkeleton: React.FC = () => {
    return (
        <div>
            <div className="show--skeleton--wrapper">
                <div className="skeleton show--skeleton--title"></div>
                <div className="skeleton show--skeleton--genres"></div>
                <div className="skeleton show--skeleton--hero"></div>
            </div>
            <div className="skeleton show--skeleton--updated"></div>
            <div className="skeleton show--skeleton--link"></div>
            <div className="skeleton show--skeleton--desc"></div>
        </div>
    );
};

export default ShowDetailsSkeleton;
