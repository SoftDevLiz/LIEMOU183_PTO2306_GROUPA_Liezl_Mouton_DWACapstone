import "../../styles/components.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ShareButton from "./ShareButton";

interface Data {
    id: string;
    title: string;
    description: string;
    seasons: any[];
    image: string;
    genres: string[];
    updated: string;
}

const ShowDetailsPage: React.FC<{}> = () => {
    const { id } = useParams<{ id: string }>();
    const [showData, setShowData] = useState<Data | null>(null);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setShowData(jsonData);
          } catch (error: any) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, [id]);

      if (!showData) {
        return <div>Loading...</div>
      }

      const updated = new Date(showData.updated)

    return (
        <>
          <Header />
            <div className="show--wrapper">
              <div className="show--title--wrapper">
                <h1>{showData.title}</h1>
                <ShareButton />
              </div>  
                <h2>{showData.seasons.length} Seasons</h2>
                <h2>{showData.genres.join(' ● ')}</h2>
                <h2>Last updated {updated.toLocaleDateString('en-US')}</h2>
                <img src={showData.image} alt={showData.title} />
                <h2>Description</h2>
                <p className="show--desc">{showData.description}</p>
              </div>
        </>
    ) 
}

export default ShowDetailsPage;