import React, { useEffect, useRef } from "react";
import { ThumbnailPlayerProps } from "../../Type";

const ThumbnailPlayer: React.FC<ThumbnailPlayerProps> = ({
  stream,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      className={`w-[800px] h-[600px] bg-black ${className}`}
      autoPlay
      playsInline
      muted
    ></video>
  );
};

export default ThumbnailPlayer;
