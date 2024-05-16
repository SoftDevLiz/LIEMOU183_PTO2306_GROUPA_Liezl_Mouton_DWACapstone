import ShowListCard from './ShowListCard';
import "../../styles/components.css";

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

interface ShowListProps {
  shows: Show[];
}

const ShowList: React.FC<ShowListProps> = ({ shows }) => {
  return (
    <div className="showlist--wrapper">
      {shows.map((show: Show) => (
        <ShowListCard
          key={show.id}
          image={show.image}
          title={show.title}
          seasons={show.seasons}
          genres={show.genres}
          description={show.description}
        />
      ))}
    </div>
  );
};

export default ShowList;
