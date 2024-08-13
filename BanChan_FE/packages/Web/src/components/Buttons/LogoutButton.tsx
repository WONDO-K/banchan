import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LogoutButton = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['Token']);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/token/logout`, {}, {
        headers: {
          Authorization: `Bearer ${cookies.Token}`, // Authorization 헤더 포함
        },
        withCredentials: true, // 쿠키 인증이 필요하면 사용
      });

      if (response.status === 200) {
        // 로그아웃 후 토큰 제거
        removeCookie('Token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // 로그아웃 후 페이지 이동
        navigate('/login');
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout failed: ', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
