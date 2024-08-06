import React from "react";
import { Subscriber } from "openvidu-browser";

interface SubscriberListProps {
  subscribers: Subscriber[];
}

const SubscriberList: React.FC<SubscriberListProps> = ({ subscribers }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {subscribers.map((sub, index) => (
        <video
          key={index}
          ref={(el) => {
            if (el) sub.addVideoElement(el);
          }}
          autoPlay
          playsInline
          className="w-[200px] h-[150px] bg-black m-1"
        ></video>
      ))}
    </div>
  );
};

export default SubscriberList;
