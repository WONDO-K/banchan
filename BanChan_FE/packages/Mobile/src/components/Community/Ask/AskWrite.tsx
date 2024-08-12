import React from "react";
import Header from "../../Header";

const AskWrite: React.FC = () => {
  return (
    <div className="min-h-screen ">
      <Header>건의함</Header>
      <div className="max-w-md mx-2 p-6 bg-white border rounded-lg my-2 mt-4 ">
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-lg font-semibold mb-2"
            >
              내용
            </label>
            <textarea
              id="content"
              className="w-full px-3 py-2 border rounded-lg h-[270px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="내용을 입력하세요"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block text-lg font-semibold mb-2">
              파일 첨부
            </label>
            <input
              type="file"
              id="file"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-b-2 border-black mb-4"></div>

        <div className="text-right">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
            작성완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskWrite;
