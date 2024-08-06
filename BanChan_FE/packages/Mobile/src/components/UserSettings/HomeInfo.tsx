const HomeInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div
        className="w-full max-w-md p-8  bg-white shadow-md rounded-md h-screen "
        style={{ height: "800px" }}
      >
        <div className="flex items-center justify-between bg-blue-500  w-full py-2 fixed top-0 left-0">
          <button className="text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-white ">세대 정보 기입</h2>
          <div className=""></div>
        </div>
        <form className="mt-[100px]">
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
                id="dongho"
                name="dongho"
                type="text"
                required
                placeholder="동"
                className="block w-[140px] px-4 text-[14px] py-4 mt-2 mr-4 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none "
              />
              <input
                id="dongho"
                name="dongho"
                type="text"
                required
                placeholder="호수"
                className="block w-[140px] px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              이름
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              required
              placeholder="이름 입력하세요"
              className="block w-full text-[14px] px-4 py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              휴대폰 번호
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              required
              placeholder="휴대폰 번호를 입력하세요"
              className="block w-full text-[14px] px-4 py-4 mt-2  border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
            />
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
