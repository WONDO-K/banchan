import MainSideBar from "../MainSideBar";
import MainHeader from "../MainHeader";
import NavItem from "../NavItem";
import Nav from "../Nav";
import Sorting from "../Sorting";
import Table from "../Table";
import Pagination from "../Pagination";
import SmallButton from "../Buttons/SmallButton";

const deleteBtn = () => {
  return (
    <SmallButton
      title="삭제"
      bgColor="bg-white"
      txtColor="text-customRed"
      borderColor="border-customRed"
    />
  );
};

const headers: string[] = [
  "번호",
  "제목",
  "작성자",
  "작성일",
  "조회수",
  "삭제",
];

const data: (string | number | React.ReactNode)[][] = [
  [
    1,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    deleteBtn(),
  ],
  [
    2,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    deleteBtn(),
  ],
  [
    3,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    deleteBtn(),
  ],
  [
    4,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    deleteBtn(),
  ],
  [
    5,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    deleteBtn(),
  ],
  [
    1,
    "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    "Author 1",
    "2022-01-01",
    100,
    deleteBtn(),
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

const Board = () => {
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

export default Board;
