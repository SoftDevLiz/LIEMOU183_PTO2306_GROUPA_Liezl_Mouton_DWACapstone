import "../../styles/components.css";
import Header from "../show details page/Header";
import EpisodeCard from "./EpisodeCard"; 
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface Season {
  season: number;
  title: string;
  image: string;
  episodes: Episode[];
}

interface Data {
  id: string;
  title: string;
  description: string;
  seasons: Season[];
  image: string;
  genres: string[];
  updated: string;
}

const ShowSeasonsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showData, setShowData] = useState<Data | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);

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

  useEffect(() => {
    if (selectedSeason !== null && showData) {
      const selectedSeasonData = showData.seasons.find(season => season.season === selectedSeason);
      setSeasonEpisodes(selectedSeasonData ? selectedSeasonData.episodes : []);
    }
  }, [selectedSeason, showData]);

  if (!showData) {
    return <div>Loading...</div>;
  }

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(Number(event.target.value));
  };

  const selectedSeasonData = showData.seasons.find(season => season.season === selectedSeason);

  return (
    <div className="season--wrapper">
      <Header />
      <h1>{showData.title}</h1>
      <form className="search--wrapper" onSubmit={(e) => e.preventDefault()}>
        <select onChange={handleSeasonChange}>
          <option value="">Select a season</option>
          {showData.seasons.map((season) => (
            <option key={season.season} value={season.season}>
              Season {season.season}
            </option>
          ))}
        </select>
      </form>
      {selectedSeasonData && (
        <div className="season--details">
          <h2>Season {selectedSeasonData.season}: {selectedSeasonData.title}</h2>
          <img src={selectedSeasonData.image} alt={`Season ${selectedSeasonData.season}`} />
        </div>
      )}
      <div className="episodes--list">
        {seasonEpisodes.map((episode) => (
          <EpisodeCard key={episode.episode} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default ShowSeasonsPage;
