import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import Table from "../Table";
import Nav from "../Nav";
import NavItem from "../NavItem";
import SmallButton from "../Buttons/SmallButton";
import { Meeting } from "../../Type";

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/meeting/reservedMeeting" label="예약된 회의" />
      <NavItem to="/meeting/finishedMeeting" label="종료된 회의" />
    </Nav>
  );
};

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const FinishedMeeting: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/session/get/roomList`);
        if (response.data && Array.isArray(response.data.data)) {
          setMeetings(response.data.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  const checkResult = () => {
    return (
      <SmallButton
        title="회의 내용보기"
        bgColor="bg-white"
        txtColor=""
        borderColor="border-customGreen"
      />
    );
  };

  const deleteMeeting = (meetingId: number) => {
    return (
      <SmallButton
        title="삭제하기"
        bgColor="bg-white"
        txtColor="text-customRed"
        borderColor="border-customRed"
        onClick={() => {
          handleDeleteMeeting(meetingId);
        }}
      />
    );
  };

  const handleDeleteMeeting = async (meetingId: number) => {
    try {
      await axios.delete(`${baseUrl}/api/session/delete/room/${meetingId}`);
      setMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== meetingId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const headers = ["번호", "제목", "주최자", "참가 인원", "상세정보", "삭제"];

  const data = meetings
    .filter((meeting) => !meeting.active && meeting.session)
    .map((meeting, index) => [
      index + 1,
      meeting.roomName,
      "관리자",
      `${meeting.id}` + "명",
      checkResult(),
      deleteMeeting(meeting.id),
    ]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6"></div>
        <Table headers={headers} data={data} />
        <Pagination maxPage={1} />
      </div>
    </>
  );
};

export default FinishedMeeting;
