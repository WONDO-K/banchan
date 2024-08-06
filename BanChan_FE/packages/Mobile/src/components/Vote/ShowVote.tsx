import React from "react";
import SwipeableContent from "./SwipeableContent";

const ShowVote: React.FC = () => {
  const voteItems = [
    {
      question: "이번 회계 감사 받기를 동의하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "올해 예산안을 승인하십니까?",
      options: [
        "1. 예",
        "2. 아니오",
        "3.asdafas",
        "4. ㅁㄴㅇㄻㄴㅇㅁㄴ",
        " 5. ㅁㄴㅇㅁㄴㅇ",
      ],
    },
    {
      question: "올해 예산안을 승인하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "올해 예산안을 승인하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between px-4 py-2 bg-blue-100">
        <button className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">나의 투표</h2>
        <button className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* 투표 내용 스와이프 */}
      <SwipeableContent items={voteItems} />
    </div>
  );
};

export default ShowVote;
