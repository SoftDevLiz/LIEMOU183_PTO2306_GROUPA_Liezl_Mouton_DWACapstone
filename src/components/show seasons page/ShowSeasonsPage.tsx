import "../../styles/components.css"
import Header from "../show details page/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Data {
    id: string;
    title: string;
    description: string;
    seasons: any[];
    image: string;
    genres: string[];
    updated: string;
}

interface Seasons {
  season: number;
  title: string;
  image: string;
  episodes: any[];
}


const ShowSeasonsPage: React.FC = () => {
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

      const seasons = showData.seasons

    return (
        <div>
          <Header />
          <h1>{showData.title}</h1>
          <form className="search--wrapper" onSubmit={(e) => e.preventDefault()}>
            <select>
              <option value="All">Seasons</option>
              {seasons.map((season) => (
                        <option key={season.season} value={season.season}>
                            {season.title}
                        </option>
                    ))}
            </select>
          </form>
        </div>
    )
}

export default ShowSeasonsPage;