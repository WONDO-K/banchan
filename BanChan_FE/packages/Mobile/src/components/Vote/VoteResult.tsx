import React from "react";
import Header from "../Header";
import SwipeableResults from "./SwipeableResult";
import { useLocation } from "react-router-dom";

const VoteResult: React.FC = () => {
  const location = useLocation();
  const { item } = location.state || { item: { title: "투표 결과" } }; // 기본값 설정

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
        "3. 기타",
        "4. 추가 선택",
        "5. 선택 항목",
      ],
    },
    {
      question: "올해 예산안을 승인하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "집안은 평안하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header>투표 결과</Header>
      <div className="p-4">
        <h3 className="text-[20px] font-bold mb-4 flex justify-center mt-10">
          {item.title}
        </h3>
        <SwipeableResults items={voteItems} />
      </div>
    </div>
  );
};

export default VoteResult;
