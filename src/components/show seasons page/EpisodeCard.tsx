import "../../styles/components.css"

    const EpisodeCard: React.FC<{}> = () => {

        return (
            <div className="card--wrapper">  
            <img 
                className="card--image" 
                src={image}
                alt="Podcast thumbnail"
            />
            <div className="card--info">
                <h3 className="card--title">{title}</h3>
                <span>{seasons} Seasons</span>
                <span>{genreTitles.join(' ● ')}</span>
            </div>
            <p className="card--description">{truncateDescription(description, 100)}</p>
        </div>
        )
    }

    export default EpisodeCard;

