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
import Notice from "../components/Community/Notice";
import KakaoCallback from "../components/oauthlogin/KakaoCallback"; // KakaoCallback 컴포넌트 임포트

const router: React.FC = () => {
  return (
    <Routes>
      <Route path="/m/" element={<FirstPage />} />
      <Route path="/m/home" element={<Home />} />
      <Route path="/m/homeInfo" element={<HomeInfo />} />
      <Route path="/m/mypage" element={<MyPage />} />
      <Route path="/m/showVote" element={<ShowVote />} />
      <Route path="/m/voteList" element={<VoteList />} />
      <Route path="/m/voteResult" element={<VoteResult />} />
      <Route path="/m/finishedVote" element={<FinishedVote />} />
      <Route path="/m/meetingList" element={<MeetingList />} />
      <Route path="/m/calendar" element={<CalendarApp />} />
      <Route path="/m/meetingHome" element={<MeetingHome />} />
      <Route path="/m/homeInfo" element={<HomeInfo />} />
      <Route path="/m/notice" element={<Notice />} />
      <Route path="/m/login/oauth2/code/kakao" element={<KakaoCallback />} /> {/* 콜백 경로 추가 */}
    </Routes>
  );
};

export default router;
