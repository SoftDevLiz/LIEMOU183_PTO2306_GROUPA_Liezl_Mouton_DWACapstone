import "../../styles/components.css"
import { useEffect, useState } from "react";
import Card from "../Landing page/Card";

interface Show {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: number[];
    updated: string;
  }

const ShowList: React.FC<{}> = () => {
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
        <div className="showlist--wrapper">
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
        </div>
        </>
    )
}

export default ShowList;
