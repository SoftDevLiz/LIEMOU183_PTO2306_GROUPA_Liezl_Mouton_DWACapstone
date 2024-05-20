import "../../styles/components.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

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

      console.log(showData)

      if (!showData) {
        return <div>Loading...</div>
      }

    return (
        <div>
          <Header />
            <h1>{showData.title}</h1>
            <img src={showData.image} alt={showData.title} />
            <p>{showData.description}</p>
            <span>seasons</span>
            <span>genres</span>
        </div>
    ) 
}

export default ShowDetailsPage;