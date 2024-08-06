import React from 'react';
import kakaoLogo from '../assets/kakao_logo.png';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoLoginButton: React.FC = () => {
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  };

  return (
    <div
      className="flex justify-center items-center px-16 py-6 mt-12 w-full bg-[#FEE500] rounded-3xl border border-solid border-neutral-700 cursor-pointer hover:bg-[#E0C200]"
      onClick={handleKakaoLogin}
    >
      <div className="flex gap-3">
        <img
          loading="lazy"
          src={kakaoLogo}
          className="shrink-0 w-9 aspect-[1.12]"
          alt="Kakao Logo"
        />
        <div className="my-auto text-[#3C1E1E] font-bold text-lg">카카오로 계속하기</div>
      </div>
    </div>
  );
}

export default KakaoLoginButton;
