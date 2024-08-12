import React from "react";
import Header from "../../Header";

const NoticeDetail: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header>공지사항</Header>
      <div className="max-w-md mx-2 p-6 bg-white border rounded-lg my-2 ">
        <h1 className="text-xl font-bold mb-2 mt-4">단지 내 공사 관련 공지</h1>
        <p className="text-gray-500 mb-4">2024.06.28</p>

        <div className="border-b-4 border-black mb-4"></div>

        <p className="mb-4">
          안녕하세요. 입주민 여러분.
          <br />
          모라 LH 단지내 공사 내용과 일정을 아래와 같이 공지하오니 확인
          부탁드립니다.
        </p>

        <div className="mb-6">
          <p className="font-bold">시공사: 흥령 건설</p>
          <p>공사 일정: 2024.07.01 ~ 2024.08.12</p>
          <p>공사 내용: 아파트 외벽 보수 작업</p>
          <p>문의 사항: 관리사무소 (02-123-4567)</p>
        </div>

        <p className="mb-6">
          안녕하십니까
          <br />
          시공사: 흥령 건설
          <br />
          공사 일정: 2024.07.01 ~ 2024.08.12
          <br />
          공사 내용: 아파트 외벽 보수 작업
          <br />
          문의 사항: 관리사무소 (02-123-4567) 안녕하십니까
          <br />
          시공사: 흥령 건설
        </p>

        <div className="border-b-2 border-black mb-4"></div>

        <div className="text-gray-600 mb-4">
          <p className="font-semibold text-gray-300">첨부파일</p>
          <p className="text-blue-500 underline">7월 모라 LH 공사 일정.hwp</p>
        </div>
        <div className="border-b-2 border-black"></div>
      </div>
    </div>
  );
};

export default NoticeDetail;
