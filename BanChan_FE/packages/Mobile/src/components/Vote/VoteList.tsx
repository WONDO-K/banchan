import React from "react";
import Drawer from "./Drawer";

const VoteList: React.FC = () => {
  const ongoingItems = [
    {
      title: "LH 7월 3주차 투표",
      date: "07.15 19:00 ~ 07.21 18:00",
      buttonText: "투표하기",
      statusText: "실시간 투표율 : 38%",
    },
    {
      title: "LH 7월 3주차 투표",
      date: "07.15 19:00 ~ 07.21 18:00",
      buttonText: "투표하기",
      statusText: "실시간 투표율 : 38%",
    },
  ];

  const completedItems = [
    {
      title: "LH 6월 3주차 투표",
      date: "06.15 19:00 ~ 06.21 18:00",
      buttonText: "결과보기",
      statusText: "최종 투표율 : 75%",
    },
    {
      title: "LH 5월 3주차 투표",
      date: "05.15 19:00 ~ 05.21 18:00",
      buttonText: "결과보기",
      statusText: "최종 투표율 : 60%",
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

      {/* 진행 중인 투표 */}
      <Drawer title="진행 중인 투표" items={ongoingItems} />

      {/* 완료된 투표 */}
      <Drawer title="완료된 투표" items={completedItems} />
    </div>
  );
};

export default VoteList;
