import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import Header from "../components/Header";

const HomeInfo: React.FC = () => {
  const [apartmentCode, setApartmentCode] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [unitNo, setUnitNo] = useState("");

  const navigate = useNavigate(); // useNavigate 훅 초기화

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestBody = {
      aptCode: apartmentCode,
      buildingNo,
      unitNo,
    };

    try {
      const response = await axios.post("/api/user/setmyapt", requestBody);

      if (response.status === 200) {
        alert("아파트 정보가 성공적으로 저장되었습니다.");
        navigate("/m/home"); // 등록이 성공하면 /m/home 경로로 리디렉션
      } else {
        alert("아파트 정보 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("아파트 정보 저장 오류:", error);
      alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header>세대 정보 기입</Header>
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
              아파트 코드
            </label>
            <input
              id="apartmentCode"
              name="apartmentCode"
              type="text"
              required
              placeholder="아파트 코드를 입력하세요"
              value={apartmentCode}
              onChange={(e) => setApartmentCode(e.target.value)}
              className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="dongho"
              className="block text-sm font-medium text-gray-600"
            >
              동/호수
            </label>
            <div className="flex">
              <input
                id="buildingNo"
                name="buildingNo"
                type="number"
                required
                placeholder="동"
                value={buildingNo}
                onChange={(e) => setBuildingNo(e.target.value)}
                className="block w-[140px] px-4 text-[14px] py-4 mt-2 mr-4 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
              <input
                id="unitNo"
                name="unitNo"
                type="number"
                required
                placeholder="호수"
                value={unitNo}
                onChange={(e) => setUnitNo(e.target.value)}
                className="block w-[140px] px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="fixed bottom-0 left-0 right-0 w-full py-4 font-semibold text-white bg-blue-500 rounded-t-xl hover:bg-blue-600"
          >
            등록하기

          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeInfo;
//버튼 누르면 home으로 이동 가능하게 수정