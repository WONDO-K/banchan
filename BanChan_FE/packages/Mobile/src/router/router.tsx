import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstPage from "../pages/FirstPage";
import Home from "../pages/Home";
import HomeInfo from "../components/UserSettings/HomeInfo";
import MyPage from "../pages/MyPage";
import ShowVote from "../components/Vote/ShowVote";
import VoteList from "../components/Vote/VoteList";
import VoteResult from "../components/Vote/VoteResult";
import FinishedVote from "../components/Vote/FinishedVote";
import MeetingList from "../components/Meeting/MeetingList";
import CalendarApp from "../components/Meeting/CalendarApp";
import MeetingHome from "../components/Meeting/MeetingHome";

const router: React.FC = () => {
  return (
    <Routes>
      <Route path="/m/" element={<FirstPage />} />
      <Route path="/m/home" element={<Home />} />
      <Route path="/m/homeInfo" element={<HomeInfo />} />
      <Route path="/m/mypage" element={<MyPage />} />
      <Route path="/m/mypage" element={<MyPage />} />
      <Route path="/m/showVote" element={<ShowVote />} />
      <Route path="/m/voteList" element={<VoteList />} />
      <Route path="/m/voteResult" element={<VoteResult />} />
      <Route path="/m/finishedVote" element={<FinishedVote />} />
      <Route path="/m/meetingList" element={<MeetingList />} />
      <Route path="/m/calendar" element={<CalendarApp />} />
      <Route path="/m/meetingHome" element={<MeetingHome />} />
    </Routes>
  );
};

export default router;
