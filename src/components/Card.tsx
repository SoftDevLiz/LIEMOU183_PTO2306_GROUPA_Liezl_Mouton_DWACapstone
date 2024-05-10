import "../styles/components.css";

export default function Card() {
    return (
     <footer>
        <div className="card--wrapper">
        <h1 className="footer--heading">Explore</h1>
        <div className="card">
            <img 
                className="card--image" 
                src="./src/assets/podcastExample.png" 
                alt="Podcast thumbnail"
            />
            <div className="card--info">
                <h3 className="card--title">Ologies by Allie Ward</h3>
                <span>10 Seasons</span>
                <span>Scientific</span>
            </div>
            <p className="card--description">Ward interviews an expert from a distinct scientific field (somnology, bryology, philematology, etc.).</p>
        </div>
        </div>
     </footer>
    )
}