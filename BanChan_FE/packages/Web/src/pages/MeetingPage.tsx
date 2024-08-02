import React, { useEffect, useRef, useState } from "react";
import { OpenVidu, Session, Publisher } from "openvidu-browser";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

type IconName =
  | "record_voice_over"
  | "mic"
  | "videocam"
  | "screen_share"
  | "headset_mic"
  | "exit_to_app"
  | "book"
  | "group"
  | "chat_bubble"
  | "notifications";

const ControlPanels: React.FC<{
  onChatToggle: () => void;
  activeIcons: Record<IconName, boolean>;
  handleButtonClick: (icon: IconName) => void;
}> = ({ onChatToggle, activeIcons, handleButtonClick }) => {
  useEffect(() => {
    console.log(activeIcons); // activeIcons 상태가 변경될 때마다 로그를 출력
  }, [activeIcons]);
  return (
    <div className="px-4 flex items-center mt-4">
      <div className="flex space-x-8 ml-[210px]">
        <button
          className={`bg-gray-800 text-white flex items-center px-4 py-2 rounded-full ${
            activeIcons.mic ? "text-customRed" : "text-white"
          }`}
          onClick={() => handleButtonClick("mic")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.mic ? "text-customRed" : "text-white"
            }`}
          >
            {activeIcons.mic ? "mic_off" : "mic"}
          </span>
          <span className="ml-2">
            {activeIcons.mic ? "마이크 켜기" : "마이크 끄기"}
          </span>
        </button>
        <button
          className={`bg-gray-800 text-white flex items-center px-4 py-2 rounded-full ${
            activeIcons.videocam ? "text-customRed" : "text-white"
          }`}
          onClick={() => handleButtonClick("videocam")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.videocam ? "text-customRed" : "text-white"
            }`}
          >
            {activeIcons.videocam ? "videocam_off" : "videocam"}
          </span>
          <span className="ml-2">
            {activeIcons.videocam ? "비디오 켜기" : "비디오 끄기"}
          </span>
        </button>
        <button
          className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("screen_share")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.screen_share ? "text-customRed" : "text-white"
            }`}
          >
            screen_share
          </span>
          <span className="ml-2">화면 공유</span>
        </button>
        <button
          className={`bg-gray-800 text-white flex items-center px-4 py-2 rounded-full ${
            activeIcons.headset_mic ? "text-customRed" : "text-white"
          }`}
          onClick={() => handleButtonClick("headset_mic")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.headset_mic ? "text-customRed" : "text-white"
            }`}
          >
            {activeIcons.headset_mic ? "headset_off" : "headset_mic"}
          </span>
          <span className="ml-2">
            {activeIcons.headset_mic ? "음소거 끄기" : "음소거 켜기"}
          </span>
        </button>
        <button
          className="bg-red-500 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("exit_to_app")}
        >
          <span className={`material-symbols-outlined`}>exit_to_app</span>
          <span className="ml-2">회의 떠나기</span>
        </button>
      </div>

      <div className="flex space-x-10 ml-[100px]">
        <span className="cursor-pointer material-symbols-outlined text-white">
          book
        </span>
        <span className="cursor-pointer material-symbols-outlined text-white">
          group
        </span>
        <span
          className={`cursor-pointer material-symbols-outlined ${
            activeIcons.chat_bubble ? "text-blue-500" : "text-white"
          }`}
          onClick={() => handleButtonClick("chat_bubble")}
        >
          chat_bubble
        </span>
        <div className="relative">
          <span className="cursor-pointer material-symbols-outlined text-yellow-500">
            notifications
          </span>
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            1
          </span>
        </div>
      </div>
    </div>
  );
};

const MeetingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: sessionId } = useParams<{ id: string }>(); // URL 파라미터를 가져옵니다
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState<boolean>(false);

  const { title, date, startTime, active } = location.state as {
    title: string;
    date: string;
    startTime: string;
    active: boolean;
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIcons, setActiveIcons] = useState<Record<IconName, boolean>>({
    record_voice_over: false,
    mic: false,
    videocam: false,
    screen_share: false,
    headset_mic: false,
    exit_to_app: false,
    book: false,
    group: false,
    chat_bubble: false,
    notifications: false,
  });

  useEffect(() => {
    if (!sessionId) {
      console.error("sessionId is undefined");
      return;
    }

    console.log(active);

    const OV = new OpenVidu();
    const mySession = OV.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      subscriber.addVideoElement(videoRef.current);
    });

    const joinSession = async () => {
      try {
        const token = await createToken(sessionId);
        await mySession.connect(token, { clientData: "Host" });

        const publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        mySession.publish(publisher);
        setPublisher(publisher);
        publisher.addVideoElement(videoRef.current);

        setActiveIcons((prevState) => ({
          ...prevState,
          videocam: !publisher.stream.videoActive,
          mic: !publisher.stream.audioActive,
        }));
      } catch (error) {
        console.error("Error connecting to session:", error);
      }
    };

    joinSession();
    setSession(mySession);

    return () => {
      if (mySession) mySession.disconnect();
    };
  }, [sessionId]);

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `http://localhost:8080/api/session/${sessionId}/token`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
        },
      }
    );

    return response.data;
  };

  const deleteSession = async (sessionId: string): Promise<void> => {
    try {
      await axios.delete(
        `http://localhost:8080/api/session/delete/${sessionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
          },
        }
      );
      navigate("/meeting/reservedMeeting");

      console.log(`Session ${sessionId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting session ${sessionId}:`, error);
    }
  };

  const handleChatToggle = () => {
    setIsChatBoxVisible((prevState) => !prevState);
  };

  const handleButtonClick = (icon: IconName) => {
    if (icon === "chat_bubble") {
      handleChatToggle();
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    } else if (icon === "exit_to_app") {
      if (session) session.disconnect();
      deleteSession(sessionId!);
    } else if (icon === "videocam") {
      if (publisher) {
        const newPublishVideo = !activeIcons.videocam;
        publisher.publishVideo(!newPublishVideo);
        setActiveIcons((prevState) => ({
          ...prevState,
          videocam: newPublishVideo,
        }));
      }
    } else if (icon === "mic") {
      if (publisher) {
        const newPublishMic = !activeIcons.mic;
        publisher.publishAudio(!newPublishMic);
        setActiveIcons((prevState) => ({
          ...prevState,
          mic: newPublishMic,
        }));
      }
    } else {
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customTextColor">
      <h1 className="text-2xl mb-4">회의 ID: {title}</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[400px] bg-black"
      ></video>
      <ControlPanels
        onChatToggle={handleChatToggle}
        activeIcons={activeIcons}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default MeetingPage;
