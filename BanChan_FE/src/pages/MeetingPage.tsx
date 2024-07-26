import React, { useEffect, useRef, useState } from "react";
import ThumbnailPlayer from "../components/WebRTC/ThumbnailPlayer";
import VideoPlayer from "../components/WebRTC/VideoPlayer";

const MeetingPage: React.FC = () => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRefs = useRef<(MediaStream | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [activeSpeaker, setActiveSpeaker] = useState<MediaStream | null>(null);

  useEffect(() => {
    // 더미 비디오 스트림 생성
    const createDummyStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      localStreamRef.current = stream;
      remoteStreamRefs.current = [stream, stream, stream, stream]; // 4개의 더미 스트림
      setActiveSpeaker(stream); // 첫 번째 스트림을 활성 화자로 설정
    };

    createDummyStream();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      remoteStreamRefs.current.forEach((stream) =>
        stream?.getTracks().forEach((track) => track.stop())
      );
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 text-white p-2">
        <h1 className="text-center text-2xl">화상회의</h1>
      </header>
      <main className="flex flex-col h-full bg-gray-200 p-4 w-full">
        <div className=" flex items-center justify-center mb-6 w-full mt-6">
          {activeSpeaker && (
            <VideoPlayer
              stream={activeSpeaker}
              className="w-2/3 h-full max-h-[55vh] bg-black rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-center w-full">
          {remoteStreamRefs.current.map((stream, index) => (
            <ThumbnailPlayer
              key={index}
              stream={stream}
              className="w-1/4 max-w-[25%] bg-black rounded-lg m-2"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MeetingPage;
