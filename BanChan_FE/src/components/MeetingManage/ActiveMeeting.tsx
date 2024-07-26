import MainHeader from "../MainHeader";
import MainSideBar from "../MainSideBar";
import Pagination from "../Pagination";
import Table from "../Table";
import SmallButton from "../Buttons/SmallButton";
import NavItem from "../NavItem";
import Nav from "../Nav";

const joinMeeting = () => {
  return (
    <SmallButton
      title="회의 참여"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customBlue"
    />
  );
};

const endMeeting = () => {
  return (
    <SmallButton
      title="회의 종료"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customPink"
    />
  );
};

const headers = ["번호", "제목", "주최자", "참여 인원"];

const data = [
  [1, "LH 7월 4주차 정기회의", "관리자", "56명", joinMeeting(), endMeeting()],
  [
    2,
    "103동 아파트 정기 회계 감사",
    "관리자",
    "72명",
    joinMeeting(),
    endMeeting(),
  ],
  [
    3,
    "[긴급] 급한 일 있습니다.",
    "관리자",
    "18명",
    joinMeeting(),
    endMeeting(),
  ],
];

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/meeting/reservedMeeting" label="예약된 회의" />
      <NavItem to="/meeting/activeMeeting" label="진행중인 회의" />
      <NavItem to="/meeting/finishedMeeting" label="종료된 회의" />
    </Nav>
  );
};

const ActiveMeeting = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <MainSideBar />

      <div className="flex-1 bg-customBackgroundColor  ">
        <MainHeader />
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <div className="flex justify-end items-center mb-6 mr-6"></div>
          <Table headers={headers} data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ActiveMeeting;
