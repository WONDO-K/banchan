import React from "react";
import Drawer from "./Drawer";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { Items } from "../../Types";

const VoteList: React.FC = () => {
  const navigate = useNavigate();
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

  const handleVoteClick = (item: Items) => {
    navigate("/m/showvote", { state: { item } });
  };

  const handleResultClick = (item: Items) => {
    navigate("/m/voteResult", { state: { item } });
  };
  return (
    <div className="min-h-screen ">
      {/* 상단 네비게이션 */}
      <Header>나의 투표</Header>
      {/* 진행 중인 투표 */}
      <Drawer
        title="진행중인 투표"
        items={ongoingItems.map((item) => ({
          ...item,
          onClick: () => handleVoteClick(item),
        }))}
      />
      {/* 완료된 투표 */}
      <Drawer
        title="완료된 투표"
        items={completedItems.map((item) => ({
          ...item,
          onClick: () => handleResultClick(item),
        }))}
      />{" "}
    </div>
  );
};

export default VoteList;
