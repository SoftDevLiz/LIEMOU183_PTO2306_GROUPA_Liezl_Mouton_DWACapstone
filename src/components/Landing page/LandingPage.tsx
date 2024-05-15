import Hero from "./Hero";
import Card from "./Card"
import { useEffect, useState } from "react";

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

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('https://podcast-api.netlify.app/shows');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData: Show[] = await response.json();
            setShowData(jsonData);
          } catch (error: any) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);

    return (
        <>
            <Hero />
            <h1 className="footer--heading">Explore</h1>
            <footer className="footer">
                {showData.map((show: Show) => (
                    <Card
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