import "../styles/components.css";

interface CardProps {
image: "",
title: "", 
seasons: "",
genres: "",
description: "",
}

const Card: React.FC<CardProps> = (props) => {
    return (
     <footer>
        <div className="card--wrapper">
        <h1 className="footer--heading">Explore</h1>
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
            <p className="card--description">{props.description}</p>
        </div>
        </div>
     </footer>
    )
}

export default Card;