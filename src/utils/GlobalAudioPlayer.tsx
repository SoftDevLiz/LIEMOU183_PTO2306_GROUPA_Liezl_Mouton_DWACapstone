import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "../../styles/components.css";

interface GlobalAudioPlayerProps {
  src: string;
}

const GlobalAudioPlayer: React.FC<GlobalAudioPlayerProps> = ({ src }) => {
  return (
    <div className="global-audio-player">
      <AudioPlayer
        src={src}
        controls
        layout="horizontal-reverse"
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showJumpControls={false}
        autoPlayAfterSrcChange={true}
      />
    </div>
  );
};

export default GlobalAudioPlayer;
