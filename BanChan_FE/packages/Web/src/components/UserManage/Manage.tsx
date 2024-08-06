import Nav from "../Nav";
import NavItem from "../NavItem";
import Pagination from "../Pagination";
import Table from "../Table";
import SmallButton from "../Buttons/SmallButton";

const modify = () => {
  return (
    <SmallButton
      title="수정"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customGreen"
    />
  );
};

const headers = ["번호", "이름", "연락처", "이메일", "신청일", "동/호수"];
const data = [
  [
    1,
    "김싸피",
    "010-1231-4567",
    "aaa@aaa.com",
    "2022-01-01",
    "101동/1102호",
    modify(),
  ],
  [
    2,
    "이싸피",
    "010-1111-2222",
    "bbb@bb.com",
    "2022-01-02",
    "101동/505호",
    modify(),
  ],
  [
    3,
    "박싸피",
    "010-2222-3333",
    "ccc@ccc.com",
    "2022-01-02",
    "101동/1234호",
    modify(),
  ],
  [
    4,
    "최싸피",
    "010-6666-6666",
    "ddd@ddd.com",
    "2022-01-02",
    "101동/1232호",
    modify(),
  ],
  [
    5,
    "김아무개",
    "010-5555-5555",
    "fff@fff.com",
    "2022-01-02",
    "101동/7894호",
    modify(),
  ],
];

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/userManage/approval" label="신규 승인대기" />
      <NavItem to="/userManage/manage" label="입주민 관리" />
    </Nav>
  );
};

const Manage = () => {
  return (
<>
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <div className="flex justify-end items-center mb-6 mr-6"></div>
          <Table headers={headers} data={data} />
          <Pagination />
        </div>
    </>
  );
};

export default Manage;
