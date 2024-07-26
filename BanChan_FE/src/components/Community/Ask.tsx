// import React from "react";
import MainHeader from "../MainHeader";
import MainSideBar from "../MainSideBar";
import Sorting from "../Sorting";
import Table from "../Table";
import Pagination from "../Pagination";
import Nav from "../Nav";
import NavItem from "../NavItem";

const headers = ["번호", "제목", "작성자", "작성일", "조회수", "추천수"];
const data = [
  [
    1,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    50,
  ],
  [
    2,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    2,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    2,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    2,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    6,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    7,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    8,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    9,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
  [
    10,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 2",
    "2022-01-02",
    150,
    75,
  ],
];

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/community/notice" label="공지사항" />
      <NavItem to="/community/ask" label="건의함" />
      <NavItem to="/community/board" label="자유게시판" />
    </Nav>
  );
};

const Ask = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <MainSideBar />

      <div className="flex-1 bg-customBackgroundColor  ">
        <MainHeader />
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <div className="flex justify-end items-center mb-6 mr-6">
            <Sorting />
          </div>
          <Table headers={headers} data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Ask;
