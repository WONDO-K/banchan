import React from "react";
import Drawer from "../Vote/Drawer";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { Items } from "../../Types";
import CalendarDrawer from "./CalendarDrawer";

const MeetingList: React.FC = () => {
  const navigate = useNavigate();

  const completedItems = [
    {
      title: "LH 7월 3주차 회의",
      date: "07.15 19:00 ~ ",
      buttonText: "요약본 확인",
      statusText: "회의 참여 인원: 30명",
    },
    {
      title: "LH 5월 3주차 회의",
      date: "05.15 19:00 ~ ",
      buttonText: "요약본 확인",
      statusText: "회의 참여 인원: 30명",
    },
  ];

  const handleResultClick = (item: Items) => {
    navigate("/m/community/notice/list", { state: { item } });
  };
  return (
    <div className="min-h-screen ">
      {/* 상단 네비게이션 */}
      <Header>나의 회의</Header>
      {/* 예정된 회의 */}
      <CalendarDrawer title="예정된 회의" />
      {/* 완료된 회의 */}
      <Drawer
        title="완료된 회의"
        items={completedItems.map((item) => ({
          ...item,
          onClick: () => handleResultClick(item),
        }))}
      />{" "}
    </div>
  );
};

export default MeetingList;
