import "../../styles/components.css"
import genreMap from "../../utils/genreMap"

interface CardProps {
    image: string;
    title: string; 
    seasons: number;
    genres: number[];
    description: string;
    }

    const ShowListCard: React.FC<CardProps> = ({ image, title, seasons, genres, description }) => {
        const truncateDescription = (description: string, maxLength: number) => {
            if (description.length <= maxLength) {
                return description;
            }
            return description.substring(0, maxLength) + '...';
        };

        const genreTitles = genres.map(genreId => genreMap[genreId]);

        const click = () => {
            console.log(`card clicked`)
        }

        return (
            <div className="card--wrapper" onClick={click}>  
            <div className="card">
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