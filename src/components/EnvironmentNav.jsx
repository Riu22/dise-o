import React from 'react';

const EnvironmentNav = ({ environments, currentEnv, onEnvChange }) => {
  return (
    <nav className="env-nav">
      {environments.map((env) => (
        <div 
          key={env.id} 
          className={`nav-card ${currentEnv === env.id ? 'active' : ''}`}
          onClick={() => onEnvChange(env.id)}
        >
          <img src={env.img} alt={env.name} className="nav-thumb" />
          <div className="nav-info">
            <span className="nav-icon">{env.icon}</span>
            <span className="nav-name">{env.name}</span>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default EnvironmentNav;