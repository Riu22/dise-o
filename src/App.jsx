import React, { useState, useEffect } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import SoundMixer from './components/SoundMixer';
import Visualizer from './components/Visualizer';
import EnvironmentNav from './components/EnvironmentNav';
import './App.css';

const ECOSYSTEMS = {
  forest: {
    id: 'forest',
    name: 'Tropical Forest',
    video: '/assets/video/forest.mp4',
    poster: '/assets/img/forest-poster.jpg',
    sounds: ['birds', 'wind', 'river'],
    theme: '#2d5a27'
  },
  ocean: {
    id: 'ocean',
    name: 'Deeper Ocean',
    video: '/assets/video/ocean.mp4',
    poster: '/assets/img/ocean-poster.jpg',
    sounds: ['waves', 'whales', 'bubbles'],
    theme: '#1a4a6e'
  },
  rain: {
    id: 'rain',
    name: 'Urban Rain',
    video: '/assets/video/rain.mp4',
    poster: '/assets/img/rain-poster.jpg',
    sounds: ['heavy_rain', 'thunder', 'city_hum'],
    theme: '#3d3d3d'
  }
};

function App() {
  const [currentEnv, setCurrentEnv] = useState('forest');
  const [globalVolume, setGlobalVolume] = useState(0.5);
  const [isStarted, setIsStarted] = useState(false);

  const activeEnv = ECOSYSTEMS[currentEnv];

  const startExperience = () => {
    setIsStarted(true);
  };

  return (
    <div className="app-container">

      {!isStarted && (
        <div className="start-overlay">
          <img src="/assets/img/logo.svg" alt="Logo" className="logo-start" />
          <button className="btn-start" onClick={startExperience}>
            EXPLORAR ECOSISTEMA
          </button>
        </div>
      )}

      <BackgroundVideo 
        src={activeEnv.video} 
        poster={activeEnv.poster} 
      />


      {isStarted && (
        <>
          <header className="main-header">
            <img src="/assets/img/logo.svg" className="logo" alt="SoundScape" />
            <h1 className="env-title">{activeEnv.name}</h1>
          </header>

          <main className="main-content">
            <div className="glass-panel">
              <Visualizer isPlaying={isStarted} volume={globalVolume} />
              
              <SoundMixer 
                tracks={activeEnv.sounds} 
                onVolumeChange={(v) => setGlobalVolume(v)} 
              />
            </div>
          </main>

          <EnvironmentNav 
            currentEnv={currentEnv} 
            onEnvChange={(id) => setCurrentEnv(id)} 
          />
        </>
      )}
    </div>
  );
}

export default App;