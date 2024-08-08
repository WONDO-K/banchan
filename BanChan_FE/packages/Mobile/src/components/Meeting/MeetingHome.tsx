import React from "react";
import logo from "@assets/logo.png";

const MeetingHome: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-blue-200 rounded-2xl p-6 w-96">
        <div className="mb-4">
          <img
            src={logo}
            alt="Main Speaker"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <img
              src={logo}
              alt="102동 대표"
              className="w-16 h-16 rounded-lg mb-2"
            />
            <p>102동 대표 (나)</p>
          </div>
          <div className="text-center">
            <img
              src={logo}
              alt="103동 동대표"
              className="w-16 h-16 rounded-lg mb-2"
            />
            <p>103동 동대표</p>
          </div>
          <div className="text-center">
            <img
              src={logo}
              alt="101동 동대표"
              className="w-16 h-16 rounded-lg mb-2"
            />
            <p>101동 동대표</p>
          </div>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4">
          발언권 요청
        </button>
        <div className="flex justify-between items-center">
          <button className="p-2 rounded-full bg-white shadow-md">
            <span role="img" aria-label="mute">
              🔇
            </span>
          </button>
          <button className="p-2 rounded-full bg-white shadow-md">
            <span role="img" aria-label="video">
              🎥
            </span>
          </button>
          <button className="p-2 rounded-full bg-white shadow-md">
            <span role="img" aria-label="chat">
              💬
            </span>
          </button>
          <button className="p-2 rounded-full bg-white shadow-md">
            <span role="img" aria-label="volume">
              🔊
            </span>
          </button>
          <button className="p-2 rounded-full bg-white shadow-md">
            <span role="img" aria-label="exit">
              ⏹️
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingHome;
