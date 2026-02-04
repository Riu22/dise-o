import React,{useRef, useEffect}  from "react";

const BackgroundVideo = ({ src, poster }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
        }
    }, [src]);

   return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster} carrega el vídeo
        className="bg-video"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
    </div>
  );
};

export default BackgroundVideo;