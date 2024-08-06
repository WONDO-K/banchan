// import { useEffect, useRef } from "react";

// interface ThumbnailPlayerProps {
//   stream: MediaStream | null;
//   className?: string;
// }

// const ThumbnailPlayer: React.FC<ThumbnailPlayerProps> = ({ stream }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current && stream) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   return (
//     <video
//       ref={videoRef}
//       className={`w-[350px] h-[250px] bg-black mx-6 my-2 rounded-lg`}
//       autoPlay
//       playsInline
//       muted
//     ></video>
//   );
// };

// export default ThumbnailPlayer;

import React, { useEffect, useRef } from "react";

interface ThumbnailPlayerProps {
  stream: MediaStream | null;
  className?: string;
}

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
