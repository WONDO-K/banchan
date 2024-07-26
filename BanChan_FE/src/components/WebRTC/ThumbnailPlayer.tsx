import { useEffect, useRef } from "react";

interface ThumbnailPlayerProps {
  stream: MediaStream | null;
  className?: string;
}

const ThumbnailPlayer: React.FC<ThumbnailPlayerProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      className={`w-1/6 bg-black m-2 rounded-lg`}
      autoPlay
      playsInline
      muted
    ></video>
  );
};

export default ThumbnailPlayer;
