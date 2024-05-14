import "../styles/components.css";

interface CardProps {
image: string;
title: string; 
seasons: number;
genres: number[];
description: string;
}

const Card: React.FC<CardProps> = ({ image, title, seasons, genres, description }) => {
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + '...';
    };

    return (
     <footer>
        <div className="card--wrapper">  
        <div className="card">
            <img 
                className="card--image" 
                src={image}
                alt="Podcast thumbnail"
            />
            <div className="card--info">
                <h3 className="card--title">{title}</h3>
                <span>{seasons} Seasons</span>
                <span>{genres.join(', ')}</span>
            </div>
            <p className="card--description">{truncateDescription(description, 150)}</p>
        </div>
        </div>
     </footer>
    )
}

export default Card;

