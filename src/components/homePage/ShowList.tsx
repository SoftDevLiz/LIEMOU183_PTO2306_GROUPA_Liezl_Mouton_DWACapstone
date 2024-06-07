import React from 'react';
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
  groupedShows?: { [genre: string]: Show[] };
  shows?: Show[];
}

const ShowList: React.FC<ShowListProps> = ({ groupedShows, shows }) => {
  if (groupedShows) {
    return (
      <div>
        {Object.keys(groupedShows).map(genre => (
          <div key={genre}>
            <h2 className='genre--title'>{genre}</h2>
            <div className="shows--by--genre">
              {groupedShows[genre].map((show: Show) => (
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
        {shows.map((show: Show) => (
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
