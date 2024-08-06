// import React, { useState, useEffect } from "react";
// // import { OpenVidu } from "openvidu-browser";

// const OPENVIDU_SERVER_URL = "https://localhost:4443";
// const SERVER_API_URL = "http://localhost:8080/api";

// const VideoConference = () => {
//   const [session, setSession] = useState(null);
//   const [mainStreamManager, setMainStreamManager] = useState(null);
//   const [publisher, setPublisher] = useState(null);
//   const [subscribers, setSubscribers] = useState([]);

//   useEffect(() => {
//     window.addEventListener("beforeunload", leaveSession);

//     return () => {
//       window.removeEventListener("beforeunload", leaveSession);
//       leaveSession();
//     };
//   }, []);

//   const createSession = async () => {
//     const response = await fetch(`${SERVER_API_URL}/session`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const sessionId = response;
//     console.log(response);
//     return sessionId;
//   };

//   const createToken = async (sessionId) => {
//     const response = await fetch(
//       `${SERVER_API_URL}/sessions/${sessionId}/token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const token = response;
//     console.log(token);
//     return token;
//   };

//   const joinSession = async () => {
//     const OV = new OpenVidu();
//     const mySession = OV.initSession();
//     setSession(mySession);

//     mySession.on("streamCreated", (event) => {
//       const subscriber = mySession.subscribe(event.stream, undefined);
//       setSubscribers([...subscribers, subscriber]);
//     });

//     mySession.on("streamDestroyed", (event) => {
//       setSubscribers(
//         subscribers.filter((sub) => sub !== event.stream.streamManager)
//       );
//     });

//     try {
//       const sessionId = await createSession();
//       const token = await createToken(sessionId);
//       await mySession.connect(token, { clientData: "Participant" });

//       const publisher = OV.initPublisher(undefined, {
//         audioSource: undefined,
//         videoSource: undefined,
//         publishAudio: true,
//         publishVideo: true,
//         resolution: "640x480",
//         frameRate: 30,
//         insertMode: "APPEND",
//         mirror: false,
//       });

//       mySession.publish(publisher);
//       setMainStreamManager(publisher);
//       setPublisher(publisher);
//     } catch (error) {
//       console.error("Error connecting to session:", error);
//     }
//   };

//   const leaveSession = () => {
//     if (session) {
//       session.disconnect();
//     }
//     setSession(null);
//     setMainStreamManager(null);
//     setPublisher(null);
//     setSubscribers([]);
//   };

//   return (
//     <div>
//       <button onClick={joinSession}>Join</button>
//       <button onClick={leaveSession}>Leave</button>
//       <div id="video-container">
//         {publisher && (
//           <div id="publisher">
//             {publisher.videos.map((video) => (
//               <video
//                 key={video.id}
//                 autoPlay={true}
//                 ref={(ref) => ref && video.addVideoElement(ref)}
//               />
//             ))}
//           </div>
//         )}
//         {subscribers.map((subscriber, index) => (
//           <div key={index} id="subscriber">
//             {subscriber.videos.map((video) => (
//               <video
//                 key={video.id}
//                 autoPlay={true}
//                 ref={(ref) => ref && video.addVideoElement(ref)}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoConference;
import React from "react";

const VideoConference: React.FC = () => {
  return <div>VideoConference</div>;
};

export default VideoConference;
