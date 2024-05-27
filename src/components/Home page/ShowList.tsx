import ShowListCard from './ShowListCard';
import "../../styles/components.css";

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: string[];
  updated: string;
}

interface ShowListProps {
  groupedShows?: { [key: string]: Show[] };
  shows?: Show[];
}

const ShowList: React.FC<ShowListProps> = ({ groupedShows, shows }) => {
  if (groupedShows) {
    return (
      <div className="showlist--wrapper">
        {Object.keys(groupedShows).map(genre => (
          <div key={genre} className="genre-section">
            <h2>{genre}</h2>
            <div className="shows">
              {groupedShows[genre].map(show => (
                <ShowListCard
                  key={show.id}
                  id={show.id}
                  image={show.image}
                  title={show.title}
                  seasons={show.seasons}
                  genres={show.genres}
                  description={show.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (shows) {
    return (
      <div className="showlist--wrapper">
        {shows.map(show => (
          <ShowListCard
            key={show.id}
            id={show.id}
            image={show.image}
            title={show.title}
            seasons={show.seasons}
            genres={show.genres}
            description={show.description}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default ShowList;
