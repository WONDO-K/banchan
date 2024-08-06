import LargeButton from "../Buttons/LargeButton";
import Pagination from "../Pagination";
import Table from "../Table";
import SmallButton from "../Buttons/SmallButton";
import Nav from "../Nav";
import NavItem from "../NavItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Meeting {
  id: number;
  roomName: string;
  startDate: string;
  startTime: string;
  session: string | null;
  createdAt: string | null;
  active: boolean;
}

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/meeting/reservedMeeting" label="예약된 회의" />
      <NavItem to="/meeting/finishedMeeting" label="종료된 회의" />
    </Nav>
  );
};

const ReservedMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/session/get/roomList"
        );

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

  const createSession = async (
    meetingId: number
  ): Promise<{ sessionId: string; token: string }> => {
    const response = await axios.post(
      `http://localhost:8080/api/session/${meetingId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
        },
      }
    );

    const sessionId = response.data;
    const tokenResponse = await axios.post(
      `http://localhost:8080/api/session/${sessionId}/token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
        },
      }
    );

    const url = tokenResponse.data;
    const urlParams = new URLSearchParams(new URL(url).search);
    const token = urlParams.get("token");

    if (!token) {
      throw new Error("Failed to retrieve token from response");
    }
    return { sessionId, token };
  };

  const handleActivateMeeting = async (meeting: Meeting) => {
    const { sessionId, token } = await createSession(meeting.id);
    navigate(`/meetingPage/${sessionId}`, {
      state: {
        token,
        sessionId,
        roomName: meeting.roomName,
        startDate: meeting.startDate,
        startTime: meeting.startTime,
        active: meeting.active,
      },
    });
  };

  const startMeeting = (meeting: Meeting) => {
    return (
      <SmallButton
        title="회의 활성화"
        bgColor="bg-white"
        txtColor=""
        borderColor="border-customGreen"
        onClick={() => handleActivateMeeting(meeting)}
      />
    );
  };

  const sendNoti = (meeting: Meeting) => {
    return (
      <SmallButton
        title="알림 보내기"
        bgColor="bg-white"
        txtColor=""
        borderColor="border-customYellow"
        onClick={() =>
          console.log(`Sending notification for meeting ID: ${meeting.id}`)
        }
      />
    );
  };

  const headers = ["번호", "제목", "주최자", "회의 예정시각", "활성화", "알림"];

  const data = meetings
    .filter((meeting) => !meeting.active && meeting.session == null)
    .map((meeting, index) => [
      index + 1,
      meeting.roomName,
      "관리자",
      `${meeting.startDate} ${meeting.startTime}`,
      startMeeting(meeting),
      sendNoti(meeting),
    ]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6">
          <Link to="/meeting/createMeeting">
            <LargeButton title="회의 생성" />
          </Link>
        </div>
        <Table headers={headers} data={data} />
        <Pagination />
      </div>
    </>
  );
};

export default ReservedMeeting;
