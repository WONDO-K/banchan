// import React from "react";
import { useNavigate } from "react-router-dom";

const SocialLoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white rounded-xl shadow-lg p-32 text-center border-solid border-2">
        <div className="mb-8">
          <div className="relative">
            <div>
              <img src="/assets/logo.png" alt="logo" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <button className="bg-yellow-400 text-black py-3.5 px-20 rounded-2xl flex items-center justify-center mx-4">
            <div className="w-[200px] flex items-center justify-center">
              <img
                src="/assets/kakao_logo.png"
                alt="KakaoTalk"
                className="w-6 h-6 mr-2"
              />
              <span className="text-center">카카오로 계속하기</span>
            </div>
          </button>

          <button className="bg-white text-black border border-gray-300 py-3.5 px-20 rounded-2xl flex items-center justify-center mx-4">
            <div className="w-[200px] flex items-center justify-center">
              <img
                src="/assets/google_logo.png"
                alt="Google"
                className="w-6 h-6 mr-2"
              />

              <span className="text-center">구글로 계속하기</span>
            </div>
          </button>

          <button
            onClick={handleLogin}
            className="bg-customBlue text-white border border-gray-300  py-3.5 px-20 rounded-2xl flex items-center justify-center "
          >
            <div className="w-[200px] flex items-center justify-center">
              <span className="text-center">관리자로 로그인 하기</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginPage;
