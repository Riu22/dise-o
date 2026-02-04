import React, { useRef, useEffect } from 'react';

const Visualizer = ({ isPlaying, volume }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(0, 210, 255, ${0.3 + volume})`; 
      
      const time = Date.now() * 0.005;
      const amplitude = 40 * volume; 

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + time) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      animationFrameId = requestAnimationFrame(render);
    };

    if (isPlaying) {
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, volume]);

  return (
    <div className="visualizer-container">
      <canvas ref={canvasRef} width="400" height="150" className="visualizer-canvas" />
    </div>
  );
};

export default Visualizer;