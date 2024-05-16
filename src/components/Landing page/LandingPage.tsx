import Hero from "./Hero";
import StaticPreviewCard from "./StaticPreviewCard"
import { useState } from "react";
import fetchData from "../../utils/fetchData";

interface Show {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: number[];
    updated: string;
  }


const LandingPage: React.FC<{}> = () => {
    const [showData, setShowData] = useState<Show[]>([]);

    fetchData(setShowData);

    return (
        <>
            <Hero />
            <h1 className="footer--heading">Explore</h1>
            <footer className="footer">
                {showData.map((show: Show) => (
                    <StaticPreviewCard
                    key={show.id}
                    image={show.image} 
                    title={show.title}
                    seasons={show.seasons}
                    genres={show.genres}
                    description={show.description}
                    />
                ))}
            </footer>
        </>
    );
}

export default LandingPage;