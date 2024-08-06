import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchToken() {
      try {
        const code = searchParams.get('code');
        if (!code) {
          throw new Error('카카오 인증 코드가 없습니다.');
        }

        // 환경 변수에서 API URL 가져오기
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error('API URL이 설정되지 않았습니다.');
        }
        console.log('API URL:', apiUrl);

        // 백엔드에 카카오 코드 전달하여 JWT 토큰 받기
        const response = await axios.post(`${apiUrl}/auth/kakao`, { code });

        const { accessToken, refreshToken } = response.data;

        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 인증 후 홈으로 이동
        navigate('/home');
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        navigate('/login'); // 로그인 실패 시 로그인 페이지로 이동
      }
    }

    fetchToken();
  }, [navigate, searchParams]);

  return <div>Loading...</div>;
}

export default KakaoCallback;
