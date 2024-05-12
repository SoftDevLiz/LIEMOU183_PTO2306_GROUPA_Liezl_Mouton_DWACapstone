import "../styles/components.css";

interface CardProps {
image: "",
title: "", 
seasons: "",
genres: "",
description: "",
}

const Card: React.FC<CardProps> = (props) => {
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
                src={props.image}
                alt="Podcast thumbnail"
            />
            <div className="card--info">
                <h3 className="card--title">{props.title}</h3>
                <span>{props.seasons} Seasons</span>
                <span>{props.genres}</span>
            </div>
            <p className="card--description">{truncateDescription(props.description, 150)}</p>
        </div>
        </div>
     </footer>
    )
}

export default Card;

