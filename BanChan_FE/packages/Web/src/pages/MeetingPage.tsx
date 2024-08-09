import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  OpenVidu,
  Session,
  Publisher,
  Subscriber,
  StreamEvent,
} from "openvidu-browser";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ControlPanels from "../components/WebRTC/ControlPanels";
import ThumbnailPlayer from "../components/WebRTC/ThumbnailPlayer";
import SubscriberList from "../components/WebRTC/SubscribeList";
import { IconName, LocationState } from "../Type";
import { useCookies } from "react-cookie";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const MeetingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const { id: sessionId } = useParams<{ id: string }>(); // URL 파라미터를 가져옵니다
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  // const [isChatBoxVisible, setIsChatBoxVisible] = useState<boolean>(false);
  const [thumbnailPlayer, setThumbnailPlayer] = useState<
    Publisher | Subscriber | null
  >(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);

  const { token, roomName } = location.state as LocationState;

  const subscriberStreams = useRef<Set<string>>(new Set());
  const [activeIcons, setActiveIcons] = useState<Record<IconName, boolean>>({
    record_voice_over: false,
    mic: false,
    videocam: false,
    headset_mic: false,
    exit_to_app: false,
    book: false,
    group: false,
    chat_bubble: false,
    notifications: false,
    radio_button_checked: false, // 녹화 시작 버튼 상태
    radio_button_unchecked: false, // 녹화 종료 버튼 상태
  });

  const joinSession = useCallback(
    async (mySession: Session, token: string) => {
      // const urlWithoutWSS = token.replace("wss://", "ws://");
      try {
        if (!token || !sessionId) {
          console.error("SessionId or token is undefined");
          return;
        }

        console.log("Received sessionId:", sessionId);
        console.log("Received token:", token);

        // 세션에 연결
        await mySession.connect(token, { clientData: "Host" });
        console.log("Successfully connected to session");

        const OV = new OpenVidu();

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

        // 퍼블리셔를 세션에 추가
        await mySession.publish(publisher);
        setPublisher(publisher);
        setThumbnailPlayer(publisher);

        setActiveIcons((prevState) => ({
          ...prevState,
          videocam: publisher.stream.videoActive,
          mic: publisher.stream.audioActive,
        }));

        console.log("Publisher added to session");
      } catch (error) {
        console.error("Error connecting to session:", error);

        if (error.message.includes("Token not valid")) {
          console.log("Token expired, requesting a new token...");
          // 새로운 토큰을 요청하는 로직을 추가합니다.
          try {
            const response = await axios.get(
              `${baseUrl}/api/session/newToken/${sessionId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${cookies.Token}`,
                },
              }
            );

            const newToken = response.data.token;
            console.log("Received new token:", newToken);

            // 새 토큰으로 다시 연결 시도
            await joinSession(mySession, newToken);
          } catch (tokenError) {
            console.error("Error requesting new token:", tokenError.message);
          }
        }
      }
    },
    [sessionId]
  );

  useEffect(() => {
    const initSession = async () => {
      try {
        if (!sessionId || !token) {
          console.error("sessionId or token is undefined");
          return;
        }

        const OV = new OpenVidu();

        const mySession = OV.initSession();

        const streamCreatedHandler = (event: StreamEvent) => {
          console.log("Stream created:", event.stream.streamId);
          if (!subscriberStreams.current.has(event.stream.streamId)) {
            subscriberStreams.current.add(event.stream.streamId);
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [
              ...prevSubscribers,
              subscriber,
            ]);
            console.log("Number of subscribers: ", subscribers.length + 1);
          }
        };

        const streamDestroyedHandler = (event: StreamEvent) => {
          console.log("Stream destroyed:", event.stream.streamId);
          subscriberStreams.current.delete(event.stream.streamId);
          setSubscribers((prevSubscribers) =>
            prevSubscribers.filter(
              (subscriber) =>
                subscriber.stream.streamId !== event.stream.streamId
            )
          );
          console.log("Number of subscribers: ", subscribers.length);
        };

        mySession.on("streamCreated", streamCreatedHandler);
        mySession.on("streamDestroyed", streamDestroyedHandler);

        await joinSession(mySession, token);
        setSession(mySession);
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    initSession();

    return () => {
      if (session) {
        session.off("streamCreated");
        session.off("streamDestroyed");
        session.disconnect();
        setSubscribers([]);
        subscriberStreams.current.clear();
      }
    };
  }, [sessionId, token, joinSession]);

  const deleteSession = async (sessionId: string): Promise<void> => {
    try {
      await axios.delete(`${baseUrl}/api/session/delete/${sessionId}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
          Authorization: `Bearer ${cookies.Token}`,
        },
      });
      navigate("/meeting/reservedMeeting");

      console.log(`Session ${sessionId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting session ${sessionId}:`, error);
    }
  };

  const startRecording = async (sessionId: string): Promise<void> => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/session/${sessionId}/startRecording`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.Token}`,
          },
        }
      );

      const recordId = response.data.id;
      setRecordingId(recordId); // 녹화 ID 저장
      console.log(recordId);
    } catch (error) {
      console.error(`error start recording`, error);
    }
  };

  const endRecording = async (
    sessionId: string,
    recordId: string
  ): Promise<void> => {
    try {
      await axios.post(
        `${baseUrl}/api/session/${sessionId}/${recordId}/stopRecording`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.Token}`,
          },
        }
      );
      setRecordingId(null); // 녹화 종료 후 ID 초기화
      console.log(`Recording stopped with ID: ${recordId}`);
    } catch (error) {
      console.error(`error end recording`, error);
    }
  };

  const handleChatToggle = () => {
    // setIsChatBoxVisible((prevState) => !prevState);
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
        publisher.publishVideo(newPublishVideo);
        setActiveIcons((prevState) => ({
          ...prevState,
          videocam: newPublishVideo,
        }));
      }
    } else if (icon === "mic") {
      if (publisher) {
        const newPublishMic = !activeIcons.mic;
        publisher.publishAudio(newPublishMic);
        setActiveIcons((prevState) => ({
          ...prevState,
          mic: newPublishMic,
        }));
      }
    } else if (
      icon === "radio_button_checked" &&
      !activeIcons.radio_button_checked
    ) {
      // 녹화 시작 버튼 클릭
      startRecording(sessionId!);
      setActiveIcons((prevState) => ({
        ...prevState,
        radio_button_checked: true,
        radio_button_unchecked: false,
      }));
    } else if (
      icon === "radio_button_unchecked" &&
      recordingId // recordingId가 있을 때만 종료
    ) {
      // 녹화 종료 버튼 클릭
      endRecording(sessionId!, recordingId);
      setActiveIcons((prevState) => ({
        ...prevState,
        radio_button_checked: false,
        radio_button_unchecked: true,
      }));
    } else {
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customTextColor">
      <h1 className="text-2xl mb-4">회의 ID: {roomName}</h1>
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center mb-4">
          {thumbnailPlayer && (
            <ThumbnailPlayer
              stream={thumbnailPlayer.stream?.getMediaStream() ?? null}
            />
          )}
        </div>
        <SubscriberList subscribers={subscribers} />
      </div>
      <ControlPanels
        onChatToggle={handleChatToggle}
        activeIcons={activeIcons}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default MeetingPage;
