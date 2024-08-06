import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth.ts'; // 상대 경로 사용

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed: ', error);
      // 필요시 사용자에게 로그아웃 실패 알림을 추가할 수 있습니다.
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full text-customSideBarTextColor focus:text-customBlue hover:text-customBlue hover:border-l-4 hover:border-customBlue cursor-pointer"
    >
      <span className="material-symbols-outlined text-[30px] pl-10">logout</span>
      <div className="mt-[2.8px] ml-2">
        <span className="ml-2 text-[18px]">로그아웃</span>
      </div>
    </button>
  );
};

export default LogoutButton;
