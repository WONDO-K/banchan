import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sorting from "../Sorting";
import Table from "../Table";
import Pagination from "../Pagination";
import Nav from "../Nav";
import NavItem from "../NavItem";

const headers = ["번호", "제목", "작성자", "작성일", "조회수", "추천수"];

// axios 요청 함수
const fetchAskList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/ask/list");
    return response.data.content; // content 배열만 반환
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다!", error);
    return [];
  }
};

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/community/notice" label="공지사항" />
      <NavItem to="/community/ask" label="건의함" />
      <NavItem to="/community/board" label="자유게시판" />
    </Nav>
  );
};

const Ask: React.FC = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const askList = await fetchAskList();
      setData(askList);
    };
    getData();
  }, []);

  // 제목 클릭 핸들러
  const handleTitleClick = (id) => {
    navigate(`/ask/${id}`);
  };

  // 데이터 형식을 Table 컴포넌트에 맞게 변환
  const tableData = data.map((item, index) => [
    index + 1, // 번호
    <span
      className="text-blue-500 cursor-pointer"
      onClick={() => handleTitleClick(item.id)}
    >
      {item.title}
    </span>, // 제목
    item.username, // 작성자
    new Date(item.createdAt).toLocaleDateString(), // 작성일
    item.views, // 조회수
    item.likes, // 추천수
  ]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6">
          <Sorting />
        </div>
        <Table headers={headers} data={tableData} />
        <Pagination />
      </div>
    </>
  );
};

export default Ask;
