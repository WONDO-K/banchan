import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleKakaoLogin } from '../api/auth';

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

        // 백엔드에 카카오 코드 전달하여 JWT 토큰 받기
        await handleKakaoLogin(code);

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
