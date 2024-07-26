// import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <img
            src="src/assets/logo.png"
            alt="반찬 로고"
            className="h-12 mb-6"
          />
          <nav className="space-y-4">
            <a href="#" className="flex items-center text-blue-500">
              <span className="ml-2">메인페이지</span>
            </a>
            <a href="#" className="flex items-center text-gray-600">
              <span className="ml-2">마이페이지</span>
            </a>
            <a href="#" className="flex items-center text-gray-600">
              <span className="ml-2">커뮤니티</span>
            </a>
            <a href="#" className="flex items-center text-gray-600">
              <span className="ml-2">이용자 관리</span>
            </a>
            <a href="#" className="flex items-center text-gray-600">
              <span className="ml-2">투표 관리</span>
            </a>
            <a href="#" className="flex items-center text-gray-600">
              <span className="ml-2">회의 관리</span>
            </a>
            <a href="#" className="flex items-center text-gray-600">
              <span className="ml-2">기타 관리</span>
            </a>
          </nav>
          <button className="mt-6 text-gray-600">로그아웃</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">메인페이지</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">현재: 부산 모라 LH 행복주택</span>
            <input
              type="text"
              placeholder="궁금한 것을 검색해보세요"
              className="px-4 py-2 border rounded"
            />
            <img
              src="src/assets/user.png"
              alt="프로필"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
          {/* 이달분 고지서 */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-lg font-semibold mb-4">이달분 고지서</h2>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold">101동 1234호 07월 고지서</p>
              <p className="text-gray-600 mt-2">납부 금액</p>
              <p className="text-2xl font-semibold">100,000원</p>
              <p className="text-gray-600 mt-2">납부 기한</p>
              <p className="text-lg">2024.07.31까지</p>
              <a href="#" className="text-blue-500 mt-4 inline-block">
                상세내역 확인하기 &gt;
              </a>
            </div>
          </div>

          {/* 등록된 차량 안내 */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-lg font-semibold mb-4">등록된 차량 안내</h2>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-xl font-bold">101동 1234호 세대 차량</p>
              <p className="text-gray-600 mt-2">2099.12.31 | 12차 3456</p>
              <p className="text-xl font-bold mt-4">방문차량 1</p>
              <p className="text-gray-600 mt-2">2024.07.25 | 12차 4567</p>
              <p className="text-gray-600 mt-4">등록된 차량이 없습니다</p>
            </div>
          </div>

          {/* 아파트 당근마켓 */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-lg font-semibold mb-4">
              아파트 당근마켓 (10월 오픈)
            </h2>
            <img
              src="src/assets/apartment_market.png"
              alt="아파트 당근마켓"
              className="rounded-lg"
            />
          </div>

          {/* 공지사항 */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-lg font-semibold mb-4">공지사항</h2>
            <ul className="space-y-2">
              {[
                "모라 LH 7월 3주차 투표 결과 공지",
                "모라 LH 7월 3주차 투표 결과 공지",
                "모라 LH 7월 3주차 투표 결과 공지",
                "모라 LH 7월 3주차 투표 결과 공지",
              ].map((item, index) => (
                <li key={index} className="border-b py-2">
                  <a href="#" className="text-gray-600">
                    {item}
                  </a>
                  <span className="float-right text-gray-500">
                    2024-07-18 18:00
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 진행중 & 예정된 회의 */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-lg font-semibold mb-4">진행중 & 예정된 회의</h2>
            <ul className="space-y-2">
              {[
                {
                  status: "진행중",
                  title: "101동 동대표 선거",
                  date: "진행중",
                },
                {
                  status: "예정",
                  title: "102동 동대표 선거",
                  date: "2024-07-28 18:00",
                },
                {
                  status: "예정",
                  title: "LH 7월 4주차 정기회의",
                  date: "2024-07-29 18:00",
                },
              ].map((item, index) => (
                <li key={index} className="border-b py-2">
                  <span className="text-gray-600">
                    [{item.status}] {item.title}
                  </span>
                  <span className="float-right text-gray-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
