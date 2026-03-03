import React, { useState, useEffect, useRef } from "react";

const SoundMixer = ({ tracks }) => {
  const [volumes, setVolumes] = useState({});
  const audioRefs = useRef({});

  useEffect(() => {
    const initialVolumes = {};
    tracks.forEach(track => {
      initialVolumes[track] = 0.5;
      if (audioRefs.current[track]) {
        audioRefs.current[track].volume = 0.5;
      }
    });
    setVolumes(initialVolumes);

    return () => {
      Object.values(audioRefs.current).forEach(audio => audio?.pause());
    };
  }, [tracks]);

  const handleVolumeChange = (track, value) => {
    const volume = parseFloat(value);
    setVolumes(prev => ({ ...prev, [track]: volume }));
    if (audioRefs.current[track]) {
      audioRefs.current[track].volume = volume;
    }
  };

  return (
    <div className="control-panel">
      <h3>Mesclador de Sons</h3>
      {tracks.map((track) => (
        <div key={track} className="track-control">
          <div className="track-info">
            {/* Icona eliminada totalment */}
            <span className="track-name">
              {track.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumes[track] || 0}
            onChange={(e) => handleVolumeChange(track, e.target.value)}
            className="slider-custom"
          />
          
          <audio
            ref={el => audioRefs.current[track] = el}
            src={`/assets/audio/${track}.mp3`}
            loop
            autoPlay
          />
        </div>
      ))}
    </div>
  );
};

export default SoundMixer;