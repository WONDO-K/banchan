// import React from "react";
import SmallButton from "../Buttons/SmallButton";
import MainHeader from "../MainHeader";
import MainSideBar from "../MainSideBar";
import Nav from "../Nav";
import NavItem from "../NavItem";
import Pagination from "../Pagination";
import Table from "../Table";

const checkResult = () => {
  return (
    <SmallButton
      title="회의 내용보기"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customGreen"
    />
  );
};

const deleteMeeting = () => {
  return (
    <SmallButton
      title="삭제하기"
      bgColor="bg-white"
      txtColor="text-customRed"
      borderColor="border-customRed"
    />
  );
};

const headers = ["번호", "제목", "주최자", "회의 일시"];

const data = [
  [
    1,
    "LH 7월 4주차 정기회의",
    "관리자",
    "2022-07-27 16:00",
    checkResult(),
    deleteMeeting(),
  ],
  [
    2,
    "103동 아파트 정기 회계 감사",
    "관리자",
    "2022-07-30 22:00",
    checkResult(),
    deleteMeeting(),
  ],
  [
    3,
    "[긴급] 급한 일 있습니다.",
    "관리자",
    "2022-08-05 13:00",
    checkResult(),
    deleteMeeting(),
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

const FinishedMeeting = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <MainSideBar />

      <div className="flex-1 bg-customBackgroundColor  ">
        <MainHeader />
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <div className="flex justify-end items-center mb-6 mr-6"></div>
          <Table headers={headers} data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default FinishedMeeting;
