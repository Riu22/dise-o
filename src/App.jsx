import React, { useState } from 'react';
import SoundMixer from './components/SoundMixer';
import Visualizer from './components/Visualizer';
import './App.css';

const ECOSYSTEMS = [
  {
    id: 'forest',
    name: 'Tropical Forest',
    video: '/assets/video/forest.mp4',
    sounds: ['birds', 'wind', 'river']
  },
  {
    id: 'ocean',
    name: 'Deeper Ocean',
    video: '/assets/video/ocean.mp4',
    sounds: ['waves', 'whales', 'bubbles']
  },
  {
    id: 'rain',
    name: 'Urban Rain',
    video: '/assets/video/rain.mp4',
    sounds: ['heavy_rain', 'thunder', 'city_hum']
  }
];

function App() {
  const [activeId, setActiveId] = useState(null);
  const [globalVolume, setGlobalVolume] = useState(0.5);

  return (
    <div className="app-container">
      <div className="accordion-wrapper">
        {ECOSYSTEMS.map((env) => (
          <div 
            key={env.id}
            className={`env-section ${activeId === env.id ? 'active' : ''}`}
            onClick={() => setActiveId(env.id)}
          >
            <video autoPlay loop muted playsInline className="section-video">
              <source src={env.video} type="video/mp4" />
            </video>

            <div className="section-content">
              {!activeId || activeId !== env.id ? (
                <div className="section-closed">
                  <h2>{env.name}</h2>
                </div>
              ) : (
                <div className="section-open">
                  <header>
                    <h1>{env.name}</h1>
                  </header>
                  
                  <div className="minimal-mixer">
                    <Visualizer isPlaying={true} volume={globalVolume} />
                    <SoundMixer 
                      tracks={env.sounds} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;