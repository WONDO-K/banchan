import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SmallButton from "../Buttons/SmallButton";
import MainHeader from "../MainHeader";
import MainSideBar from "../MainSideBar";

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  views: number;
  likes: number;
  createdAt: string;
}

const DetailContent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-7xl h-[750px]">
      <div className="mt-[20px]">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            제목
          </label>
          <div className="w-full h-[60px] px-3 py-2 border bg-customInputStyle border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            {post.title}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            내용
          </label>
          <div className="w-full h-[350px] px-3 py-2 bg-customInputStyle border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            {post.content}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            첨부 파일
          </label>
          <div
            className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
          ></div>
        </div>
        <div className="flex justify-end mt-[40px]">
          <SmallButton
            title="수정"
            bgColor="bg-white"
            txtColor="text-customGreen"
            borderColor="border-customGreen"
          />
          <div className="mr-3"></div>
          <SmallButton
            title="삭제"
            bgColor="bg-white"
            txtColor="text-customRed"
            borderColor="border-customRed"
          />
        </div>
      </div>
    </div>
  );
};

const Detail: React.FC = () => {
  const { boardType, id } = useParams<{ boardType: string; id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/${boardType}/detail/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다!", error);
      }
    };

    fetchPostDetail();
  }, [boardType, id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <MainSideBar />
      <div className="flex-1 flex flex-col">
        <MainHeader />
        <div className="flex-1 flex items-center justify-center bg-customBackgroundColor p-4">
          <DetailContent post={post} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
