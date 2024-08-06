import React from 'react';
import kakaoLogo from '@assets/kakao_logo.png';

const KakaoLoginButton: React.FC = () => {
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
    console.error("Kakao Client ID or Redirect URI is not defined");
    return null; // 환경 변수가 없을 경우, 버튼을 렌더링하지 않음 - 그냥 에러 찾는용
  }

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  return (
    <a href={KAKAO_AUTH_URL} className="bg-yellow-400 text-black py-3.5 px-20 rounded-2xl flex items-center justify-center mx-4">
      <div className="w-[200px] flex items-center justify-center">
        <img src={kakaoLogo} alt="KakaoTalk" className="w-6 h-6 mr-2" />
        <span className="text-center">카카오로 계속하기</span>
      </div>
    </a>
  );
};

export default KakaoLoginButton;