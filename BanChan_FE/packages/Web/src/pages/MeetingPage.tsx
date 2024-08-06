// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { OpenVidu, Session, Publisher, Subscriber } from "openvidu-browser";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ControlPanels from "../components/WebRTC/ControlPanels";

// type IconName =
//   | "record_voice_over"
//   | "mic"
//   | "videocam"
//   | "screen_share"
//   | "headset_mic"
//   | "exit_to_app"
//   | "book"
//   | "group"
//   | "chat_bubble"
//   | "notifications";

// const MeetingPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id: sessionId } = useParams<{ id: string }>(); // URL 파라미터를 가져옵니다
//   const [session, setSession] = useState<Session | null>(null);
//   const [publisher, setPublisher] = useState<Publisher | null>(null);
//   const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
//   const [isChatBoxVisible, setIsChatBoxVisible] = useState<boolean>(false);

//   const { token, title, date, startTime, active } = location.state as {
//     token: string;
//     title: string;
//     date: string;
//     startTime: string;
//     active: boolean;
//   };

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const subscriberStreams = useRef<Set<string>>(new Set());
//   const [activeIcons, setActiveIcons] = useState<Record<IconName, boolean>>({
//     record_voice_over: false,
//     mic: false,
//     videocam: false,
//     screen_share: false,
//     headset_mic: false,
//     exit_to_app: false,
//     book: false,
//     group: false,
//     chat_bubble: false,
//     notifications: false,
//   });

//   const joinSession = useCallback(
//     async (mySession: Session, token: string) => {
//       try {
//         if (!token || !sessionId) {
//           console.error("SessionId or token is undefined");
//           return;
//         }

//         console.log("Received sessionId:", sessionId);
//         console.log("Received token:", token);

//         await mySession.connect(token, { clientData: "Participant" });

//         const OV = new OpenVidu();
//         const publisher = OV.initPublisher(undefined, {
//           audioSource: undefined,
//           videoSource: undefined,
//           publishAudio: true,
//           publishVideo: true,
//           resolution: "640x480",
//           frameRate: 30,
//           insertMode: "APPEND",
//           mirror: false,
//         });

//         mySession.publish(publisher);
//         setPublisher(publisher);
//         publisher.addVideoElement(videoRef.current);

//         setActiveIcons((prevState) => ({
//           ...prevState,
//           videocam: publisher.stream.videoActive,
//           mic: publisher.stream.audioActive,
//         }));
//       } catch (error) {
//         console.error("Error connecting to session:", error);
//       }
//     },
//     [sessionId]
//   );

//   useEffect(() => {
//     const initSession = async () => {
//       if (!sessionId || !token) {
//         console.error("sessionId or token is undefined");
//         return;
//       }

//       const OV = new OpenVidu();
//       const mySession = OV.initSession();

//       const streamCreatedHandler = (event: any) => {
//         console.log("Stream created:", event.stream.streamId);
//         if (!subscriberStreams.current.has(event.stream.streamId)) {
//           subscriberStreams.current.add(event.stream.streamId);
//           const subscriber = mySession.subscribe(event.stream, undefined);
//           setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
//           console.log("Number of subscribers: ", subscribers.length + 1);
//         }
//       };

//       const streamDestroyedHandler = (event: any) => {
//         console.log("Stream destroyed:", event.stream.streamId);
//         subscriberStreams.current.delete(event.stream.streamId);
//         setSubscribers((prevSubscribers) =>
//           prevSubscribers.filter(
//             (subscriber) => subscriber.stream.streamId !== event.stream.streamId
//           )
//         );
//         console.log("Number of subscribers: ", subscribers.length);
//       };

//       mySession.on("streamCreated", streamCreatedHandler);
//       mySession.on("streamDestroyed", streamDestroyedHandler);

//       await joinSession(mySession, token);
//       setSession(mySession);

//       return () => {
//         if (mySession) {
//           mySession.off("streamCreated", streamCreatedHandler);
//           mySession.off("streamDestroyed", streamDestroyedHandler);
//           mySession.disconnect();
//           setSubscribers([]);
//           subscriberStreams.current.clear();
//         }
//       };
//     };

//     initSession();
//   }, [sessionId, token, joinSession]);

//   const deleteSession = async (sessionId: string): Promise<void> => {
//     try {
//       await axios.delete(
//         `http://localhost:8080/api/session/delete/${sessionId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
//           },
//         }
//       );
//       navigate("/meeting/reservedMeeting");

//       console.log(`Session ${sessionId} deleted successfully`);
//     } catch (error) {
//       console.error(`Error deleting session ${sessionId}:`, error);
//     }
//   };

//   const handleChatToggle = () => {
//     setIsChatBoxVisible((prevState) => !prevState);
//   };

//   const handleButtonClick = (icon: IconName) => {
//     if (icon === "chat_bubble") {
//       handleChatToggle();
//       setActiveIcons((prevState) => ({
//         ...prevState,
//         [icon]: !prevState[icon],
//       }));
//     } else if (icon === "exit_to_app") {
//       if (session) session.disconnect();
//       deleteSession(sessionId!);
//     } else if (icon === "videocam") {
//       if (publisher) {
//         const newPublishVideo = !activeIcons.videocam;
//         publisher.publishVideo(newPublishVideo);
//         setActiveIcons((prevState) => ({
//           ...prevState,
//           videocam: newPublishVideo,
//         }));
//       }
//     } else if (icon === "mic") {
//       if (publisher) {
//         const newPublishMic = !activeIcons.mic;
//         publisher.publishAudio(newPublishMic);
//         setActiveIcons((prevState) => ({
//           ...prevState,
//           mic: newPublishMic,
//         }));
//       }
//     } else {
//       setActiveIcons((prevState) => ({
//         ...prevState,
//         [icon]: !prevState[icon],
//       }));
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-customTextColor">
//       <h1 className="text-2xl mb-4">회의 ID: {title}</h1>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         className="w-[400px] bg-black"
//       ></video>
//       {subscribers.map((sub, index) => (
//         <video
//           key={index}
//           ref={(el) => {
//             if (el) sub.addVideoElement(el);
//           }}
//           autoPlay
//           playsInline
//           className="w-[400px] bg-black"
//         ></video>
//       ))}
//       <ControlPanels
//         onChatToggle={handleChatToggle}
//         activeIcons={activeIcons}
//         handleButtonClick={handleButtonClick}
//       />
//     </div>
//   );
// };

// export default MeetingPage;
import React from "react";

const MeetingPage: React.FC = () => {
  return <div>MeetingPage</div>;
};

export default MeetingPage;
