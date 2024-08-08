import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const baseUrl = import.meta.env.VITE_BASE_API_URL;
console.log("Base URL:", baseUrl);

const CreateMeeting: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [cookies] = useCookies();

  const navigate = useNavigate();

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = cookies.Token;
    console.log("Token:", token);
    try {
      await axios.post(
        `${baseUrl}/api/session/createRoom`,
        {
          roomName,
          startDate,
          startTime,
        },
        {
          headers: {
            // Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/meeting/reservedMeeting`);
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md  mt-[200px]">
        <h2 className="text-2xl font-bold mb-6">회의 생성</h2>
        <form onSubmit={handleCreateMeeting}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              날짜
            </label>
            <input
              type="date"
              id="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              시작 시간
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            생성 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeeting;
