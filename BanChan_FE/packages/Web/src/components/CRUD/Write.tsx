import React, { useState } from "react";
import MainHeader from "../MainHeader";
import MainSideBar from "../MainSideBar";
import SmallButton from "../Buttons/SmallButton";

const WriteContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-7xl h-[750px]">
      <div className="mt-[20px]">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-[60px] px-3 py-2 border bg-customInputStyle border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            내용
          </label>
          <textarea
            placeholder="본문 내용을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[350px] px-3 py-2 bg-customInputStyle border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            파일 업로드
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
          />
          {file && (
            <p className="text-gray-500 mt-2">첨부된 파일: {file.name}</p>
          )}
        </div>
        <div className="flex  justify-end mt-[40px]">
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 ">
            글쓰기
          </button> */}
          <SmallButton
            title="글작성"
            bgColor="bg-customFocusedTextColor"
            txtColor="text-white"
          />
        </div>
      </div>
    </div>
  );
};

const Write = () => {
  return (
    <div className="flex h-screen">
      <MainSideBar />
      <div className="flex-1 flex flex-col">
        <MainHeader />
        <div className="flex-1 flex items-center justify-center bg-customBackgroundColor p-4">
          <WriteContent />
        </div>
      </div>
    </div>
  );
};

export default Write;
