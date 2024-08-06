import React, { useEffect, useState } from "react";
import axios from "axios";
import Sorting from "../Sorting";
import Pagination from "../Pagination";
import Nav from "../Nav";
import NavItem from "../NavItem";
import { useCookies } from "react-cookie";
import TempTable from "../TempTable";
import { AskItem } from "../../Type";

const API_URL = import.meta.env.VITE_API_URL;
const headers = ["id", "title", "writer", "createdAt", "views", "likes"];

// axios 요청 함수
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
  const [data, setData] = useState<AskItem[]>([]);
  const [cookies] = useCookies();
  const [maxPage, setMaxPage] = useState<number>(1);
  const [crtPage, setCrtPage] = useState<number>(1);
  const fetchAskList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/ask/list`, {
        headers: {
          Authorization: `Bearer ${cookies.Token}`, // Use response data here
        },
        params: {
          page: crtPage - 1,
          size: 10,
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      });
      return response.data; // content 배열만 반환
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다!", error);
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      const askList = await fetchAskList();
      console.log(askList);
      setMaxPage(askList.totalPages);
      setCrtPage(askList.pageable.pageNumber + 1);
      const real_data = askList.content.map((item: AskItem) => ({
        id: item.id,
        title: item.title,
        writer: item.username,
        createdAt: item.createdAt,
        views: item.views,
        likes: item.likes,
      }));
      setData(real_data);
    };
    getData();
  }, [crtPage]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6">
          <Sorting />
        </div>
        <TempTable headerProp={headers} data={data} />
        <Pagination maxPage={maxPage} />
      </div>
    </>
  );
};

export default Ask;
