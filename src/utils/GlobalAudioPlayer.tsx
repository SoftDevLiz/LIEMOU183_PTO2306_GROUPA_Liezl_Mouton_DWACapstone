import "../styles/components.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface GlobalAudioPlayerProps {
  src: string;
}

const GlobalAudioPlayer: React.FC<GlobalAudioPlayerProps> = ({ src }) => {
  return (
    <div className="global-audio-player">
      <AudioPlayer
        src={src}
        layout="stacked-reverse"
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showJumpControls={false}
        autoPlayAfterSrcChange={true}
      />
    </div>
  );
};

export default GlobalAudioPlayer;
