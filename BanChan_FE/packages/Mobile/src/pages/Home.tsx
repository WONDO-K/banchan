import React from "react";
import bgImage from "@assets/Mobile_main.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const items = [
  { icon: "person", text: "마이페이지", to: "/mypage" },
  { icon: "forum", text: "커뮤니티", to: "/community" },
  { icon: "how_to_vote", text: "투표", to: "/vote" },
  { icon: "calendar_today", text: "회의", to: "/meeting" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const gotoHomeInfo = () => {
    navigate("/m/homeInfo");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="relative w-[360px] h-[450px]">
        <img
          src={bgImage}
          alt="Mobile Main"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
          <span className="text-white text-2xl font-bold">반상회 CHANel</span>
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
        <div>세대 정보 기입 이후 정상 이용이 가능합니다. </div>
        <button
          onClick={gotoHomeInfo}
          className="w-[250px] mt-[30px] h-[60px] border rounded-2xl text-white bg-blue-600"
        >
          세대 정보 추가
        </button>
      </div>
    </div>
  );
};

export default Home;
