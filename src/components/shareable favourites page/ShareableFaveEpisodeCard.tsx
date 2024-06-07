import "../../styles/components.css";
import { useAudioPlayer } from '../../context/AudioPlayerContext';

interface FavouriteEpisodeProps {
    userId: string,
    show: string,
    season_id: number;
    season: string,
    episodeId: number,
    title: string,
    desc: string,
    audio: string,
}

const ShareableFaveEpisodeCard: React.FC<FavouriteEpisodeProps> = ({ userId, show, season_id, season, episodeId, title, desc, audio }) => {

    const header = `${show}: ${title}`;

    const { dispatch } = useAudioPlayer();

    const handlePlay = () => {
        if (userId) {
            dispatch({ type: 'PLAY', payload: { track: audio, title: header, currentTime: 0 } });
        } else {
            console.error('User not logged in');
        }
    };
      
    return (
        <div className="fave--episode--wrapper">
            <h2>{show}</h2>
            <div className="fave--title--wrapper">
                <h3 className="card--title">{title}</h3>
                <button className="play--button" onClick={handlePlay}></button>
            </div>
            <h4>Season {season_id}: {season}</h4>
            <h4>Episode {episodeId}</h4>
            <p className="card--description">{desc}</p>
        </div>
    )
};

export default ShareableFaveEpisodeCard;
