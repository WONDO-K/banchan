// import React, { useEffect, useState } from "react";
// import bgImage from "@assets/Mobile_main.jpg";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
import React from "react";
import bgImage from "@assets/Mobile_main.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const items = [
  { icon: "person", text: "마이페이지", to: "/m/mypage" },
  { icon: "forum", text: "커뮤니티", to: "" },
  { icon: "how_to_vote", text: "투표", to: "/m/voteList" },
  { icon: "calendar_today", text: "회의", to: "/m/meetingList" },
];

const announcements = [
  {
    title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    date: "2024.07.17",
  },
  {
    title: "[공지] 단지 내 공사 관련 공지",
    date: "2024.06.28",
  },
];

const Home: React.FC = () => {
  // const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("/api/user/myinfo")
  //     .then((response) => {
  //       setUserInfo(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user info:", error);
  //     });
  // }, []);

  const gotoHomeInfo = () => {
    navigate("/m/homeInfo");
  };

  const userAPT = 0;
  // const hasUserApartments =
  //   userInfo.userApartments && userInfo.userApartments.length > 0;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="relative w-[360px] h-[450px]">
        <img
          src={bgImage}
          alt="Mobile Main"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
          <span className="text-white text-2xl font-bold">반상회 CHANnel</span>
        </div>
      </div>

      <div className="relative w-[320px] h-[120px] mt-[-50px] flex bg-[#F0F8FF] border rounded-[20px] justify-center items-center z-10">
        {items.map((item) => (
          <NavLink
            key={item.text}
            to={item.to}
            className="flex flex-col items-center mx-3 text-blue-600"
          >
            <span className="material-symbols-outlined text-[40px] mb-[10px]">
              {item.icon}
            </span>
            <span className="mt-2 text-[14px] font-semibold text-black">
              {item.text}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="relative w-[320px] h-[160px] mt-[30px] flex flex-col bg-[#F0F8FF] border rounded-[20px] justify-center items-center z-10 font-semibold">
        {/* {hasUserApartments && userInfo.userApartments[0].granted ? ( */}
        {userAPT == 0 ? (
          <>
            <div>세대 정보 기입 이후 정상 이용이 가능합니다. </div>
            <button
              onClick={gotoHomeInfo}
              className="w-[250px] mt-[30px] h-[60px] border rounded-2xl text-white bg-blue-600"
            >
              세대 정보 추가
            </button>
          </>
        ) : (
          <>
            <div className="relative w-[320px] p-4 bg-[#F0F8FF] border rounded-[10px]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">공지사항</span>
                <NavLink to="/more" className="text-gray-500">
                  더보기
                </NavLink>
              </div>
              {announcements.map((announcement, index) => (
                <div key={index} className="mb-2">
                  <div className="font-semibold text-black">
                    {announcement.title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {announcement.date}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

// import React from "react";

// const Home: React.FC = () => {
//   return <div>Home</div>;
// };

// export default Home;
