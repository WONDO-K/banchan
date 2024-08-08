import React from "react";
import Drawer from "../Vote/Drawer";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { Items } from "../../Types";
import CalendarDrawer from "./CalendarDrawer";

const MeetingList: React.FC = () => {
  const navigate = useNavigate();

  //   const futureItem = [
  //     {
  //       title: "LH 7월 3주차 회의",
  //       date: "07.15 19:00 ~ ",
  //       buttonText: "회의 참여",
  //       statusText: "회의 참여 인원: 0명",
  //     },
  //     {
  //       title: "LH 7월 3주차 회의",
  //       date: "07.15 19:00 ~ ",
  //       buttonText: "회의 참여",
  //       statusText: "회의 참여 인원: 0명",
  //     },
  //   ];
  const ongoingItems = [
    {
      title: "LH 7월 3주차 회의",
      date: "07.15 19:00 ~ ",
      buttonText: "회의 참여",
      statusText: "회의 참여 인원: 12명",
    },
    {
      title: "LH 7월 3주차 회의",
      date: "07.15 19:00 ~ ",
      buttonText: "회의 참여",
      statusText: "회의 참여 인원: 12명",
    },
  ];

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

  const handleMeetingClick = (item: Items) => {
    navigate("/m/meetingHome", { state: { item } });
  };

  const handleResultClick = (item: Items) => {
    navigate("/m/voteResult", { state: { item } });
  };
  return (
    <div className="min-h-screen ">
      {/* 상단 네비게이션 */}
      <Header>나의 회의</Header>
      {/* 진행 중인 투표 */}
      <CalendarDrawer title="예정된 회의" />
      <Drawer
        title="진행중인 회의"
        items={ongoingItems.map((item) => ({
          ...item,
          onClick: () => handleMeetingClick(item),
        }))}
      />
      {/* 완료된 투표 */}
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
