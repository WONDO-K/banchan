import React from "react";
import { Route, Routes } from "react-router-dom";
import Pagination from "../Pagination";
import LargeButton from "../Buttons/LargeButton";
import Sorting from "../Sorting";
import Table from "../Table";
import NavItem from "../NavItem";
import Nav from "../Nav";
import Write from "../CRUD/Write";

// interface Apt {
//   code: string;
//   apartment_name: string;
//   addr: string;
//   total_units: number;
// }

// interface Data {
//   id: number;
//   username: string;
//   apt: Apt;
//   title: string;
//   content: string;
//   views: number;
//   created_at: string;
//   admin: boolean;
//   writer: boolean;
// }

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

const Notice: React.FC = () => {
  // const [data, setData] = useState<Data | null>();
  // const [loading, setLoading] = useState<boolean>();
  // const [error, setError] = useState<string | null>();

  // useEffect(() => {
  //   const fetchData = async () => {};
  // }, []);

  return (
        <>
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route
              path="/"
              element={
                <>
                  <div className="flex justify-end items-center mb-6 mr-6">
                    <Sorting />
                    <LargeButton title="글작성" to="/write" />
                  </div>
                  <Table headers={headers} data={data} />
                  <Pagination maxPage={1}  />
                </>
              }
              />
          </Routes>
        </div>
      </>
  );
};

export default Notice;
