// import React from "react";
import MainSideBar from "../MainSideBar";
import MainHeader from "../MainHeader";
import LargeButton from "../Buttons/LargeButton";
import Pagination from "../Pagination";
import Table from "../Table";
import SmallButton from "../Buttons/SmallButton";
import Nav from "../Nav";
import NavItem from "../NavItem";

const startMeeting = () => {
  return (
    <SmallButton
      title="회의 활성화"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customGreen"
    />
  );
};

const sendNoti = () => {
  return (
    <SmallButton
      title="알림 보내기"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customYellow"
    />
  );
};

const headers = ["번호", "제목", "주최자", "회의 예정시각"];

const data = [
  [
    1,
    "LH 7월 4주차 정기회의",
    "관리자",
    "2022-07-27 16:00",
    startMeeting(),
    sendNoti(),
  ],
  [
    2,
    "103동 아파트 정기 회계 감사",
    "관리자",
    "2022-07-30 22:00",
    startMeeting(),
    sendNoti(),
  ],
  [
    3,
    "[긴급] 급한 일 있습니다.",
    "관리자",
    "2022-08-05 13:00",
    startMeeting(),
    sendNoti(),
  ],
];

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/meeting/reservedMeeting" label="예약된 회의" />
      <NavItem to="/meeting/activeMeeting" label="진행중인 회의" />
      <NavItem to="/meeting/finishedMeeting" label="종료된 회의" />
    </Nav>
  );
};

const ReservedMeeting = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <MainSideBar />

      <div className="flex-1 bg-customBackgroundColor  ">
        <MainHeader />
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <div className="flex justify-end items-center mb-6 mr-6">
            <LargeButton title="회의 생성" />
          </div>
          <Table headers={headers} data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ReservedMeeting;
