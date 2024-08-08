import React, { useEffect, useState } from "react";
import Sorting from "../Sorting";
import Pagination from "../Pagination";
import Nav from "../Nav";
import NavItem from "../NavItem";
import { useCookies } from "react-cookie";
import TempTable from "../TempTable";
import { getCommunityList } from "../../api/CommunityAPI";
import { CommunityParamsType,CommunityListType,DataItem} from "../../Type";
const headers = ["id", "title", "writer", "createdAt", "views", "likes"];

// axios 요청 함수
const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/community/notice" label="공지사항" />
      <NavItem to="/community/ask" label="건의함" />
    </Nav>
  );
};

const Ask: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [cookies] = useCookies();
  const [maxPage] = useState<number>(1);
  const [crtPage] = useState<number>(1);

  const [params,setParams] = useState<CommunityParamsType>({
    keyword:'',
    sortBy:'createdAt',
    sortDirection:'desc',
    page:0,
    size:10
  })

  useEffect(() => {
    const getData = async () => {
      const askList = await getCommunityList(cookies.Token,'api/ask/list',params);
      console.log(askList);
      setParams({  
        ...params,
        page:crtPage-1
      }
      )
      const real_data = askList.content.map((item:CommunityListType) => ({
        id: item.id,
        title: item.title,
        writer: item.username,
        createdAt: item.createdAt.replace("T", " ").slice(0, -7),
        views: item.views,
        likes: item.likes,
      }));
      setData(real_data);
    };
    getData();
  }, []);

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
