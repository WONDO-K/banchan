import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const validate = () => {
    // 로그인 유효성 검증 로직
    console.log("로그인 유효성 검증:", user);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="flex flex-col justify-center w-[700px] h-[480px] p-[30px] bg-white shadow-md rounded-lg">
        <div className="text-center mb-8">
          <header className="text-2xl font-semibold text-gray-800">
            로그인
          </header>
        </div>
        <div className="mb-8">
          <input
            name="userId"
            type="text"
            className="w-full h-14 text-lg px-6 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform focus:scale-105"
            placeholder="아이디"
            autoComplete="off"
            required
            value={user.userId}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="password"
            type="password"
            className="w-full h-14 text-lg px-6 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform focus:scale-105"
            placeholder="비밀번호"
            autoComplete="off"
            required
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between items-center mb-10">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              id="check"
              className="mr-2"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            아이디 기억하기
          </label>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            비밀번호 찾기
          </a>
        </div>
        <div className="relative mb-6">
          <button
            className="w-full h-14 bg-customBlue text-white rounded-lg transition-transform transform hover:bg-customBlue hover:scale-105"
            id="submit"
            onClick={validate}
          >
            로그인
          </button>
        </div>
        <div className="text-center text-sm">
          <p>
            아이디가 존재하지 않습니까?{" "}
            <Link
              to="/signup"
              className="text-black font-semibold hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
