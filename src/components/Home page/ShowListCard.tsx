import "../../styles/components.css"
import genreMap from "../../utils/genreMap"

interface CardProps {
    id: string;
    key: string;
    image: string;
    title: string; 
    seasons: number;
    genres: number[];
    description: string;
    }

    const ShowListCard: React.FC<CardProps> = ({ id, image, title, seasons, genres, description }) => {
        const truncateDescription = (description: string, maxLength: number) => {
            if (description.length <= maxLength) {
                return description;
            }
            return description.substring(0, maxLength) + '...';
        };

        const genreTitles = genres.map(genreId => genreMap[genreId]);

        return (
            <div className="card--wrapper">  
            <div className="card" data-showid={id}>
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
        </div>
        )
    }

    export default ShowListCard;

