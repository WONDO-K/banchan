import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstPage from "../pages/FirstPage";
import Home from "../pages/Home";
import HomeInfo from "../components/UserSettings/HomeInfo";

const router: React.FC = () => {
  return (
    <Routes>
      <Route path="/m/FirstPage" element={<FirstPage />} />
      <Route path="/m/home" element={<Home />} />
      <Route path="/m/homeInfo" element={<HomeInfo />} />
    </Routes>
  );
};

export default router;
