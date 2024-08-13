import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCookies } from "react-cookie";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [apartmentCode, setApartmentCode] = useState("");
  const [dongHo, setDongHo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedAccount, setLinkedAccount] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(["Token"]);

  // 페이지가 로드될 때 사용자 정보를 가져옵니다.
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/myinfo", {
          headers: {
            Authorization: `Bearer ${cookies.Token}`, // 쿠키에서 가져온 토큰 사용
          },
        });
        const userInfo = response.data;
        setApartmentCode(userInfo.apartmentCode);
        setDongHo(userInfo.dongHo);
        setPhoneNumber(userInfo.phoneNumber);
        setLinkedAccount(userInfo.linkedAccount);
        setName(userInfo.name);
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error);
      }
    };

    fetchUserInfo();
  }, [cookies.Token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 수정된 정보를 서버에 저장하는 요청을 보냅니다.
      const response = await axios.put("/api/user/update", {
        apartmentCode,
        dongHo,
        phoneNumber,
        linkedAccount,
        name,
      }, {
        headers: {
          Authorization: `Bearer ${cookies.Token}`, // 쿠키에서 가져온 토큰 사용
        },
      });

      if (response.status === 200) {
        alert("정보가 성공적으로 저장되었습니다.");
        navigate("/m/home"); // 저장 후 홈 페이지로 이동
      } else {
        alert("정보 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("정보 저장 오류:", error);
      alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header>내 정보</Header>
      <div
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md h-screen"
        style={{ height: "750px" }}
      >
        <form className="mt-[20px]" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="apartmentCode"
              className="block text-sm font-medium text-gray-600"
            >
              우리집
            </label>
            {isEditing ? (
              <input
                type="text"
                value={apartmentCode}
                onChange={(e) => setApartmentCode(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {apartmentCode}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="dongHo"
              className="block text-sm font-medium text-gray-600"
            >
              동/호수
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dongHo}
                onChange={(e) => setDongHo(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {dongHo}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              휴대폰 번호
            </label>
            {isEditing ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {phoneNumber}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="linkedAccount"
              className="block text-sm font-medium text-gray-600"
            >
              연동된 계정
            </label>
            {isEditing ? (
              <input
                type="text"
                value={linkedAccount}
                onChange={(e) => setLinkedAccount(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {linkedAccount}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              이름
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-[100px] border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-[100px] border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {name}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`fixed bottom-0 left-0 right-0 w-full py-4 font-semibold text-white bg-blue-500 rounded-t-xl hover:bg-blue-600 ${
              isEditing ? "" : "hidden"
            }`}
          >
            수정 완료
          </button>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="fixed bottom-0 left-0 right-0 w-full py-4 font-semibold text-white bg-blue-500 rounded-t-xl hover:bg-blue-600"
            >
              수정하기
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyPage;
