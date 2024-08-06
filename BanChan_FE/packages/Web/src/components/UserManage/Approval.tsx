import Pagination from "../Pagination";
import Table from "../Table";
import Nav from "../Nav";
import NavItem from "../NavItem";
import SmallButton from "../Buttons/SmallButton";

const approve = () => {
  return (
    <SmallButton
      title="승인"
      bgColor="bg-white"
      txtColor="text-customBlue"
      borderColor="border-customBlue"
    />
  );
};

const reject = () => {
  return (
    <SmallButton
      title="거절"
      bgColor="bg-white"
      txtColor="text-customRed"
      borderColor="border-customRed"
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
    approve(),
    reject(),
  ],
  [
    2,
    "이싸피",
    "010-1111-2222",
    "bbb@bb.com",
    "2022-01-02",
    "101동/505호",
    approve(),
    reject(),
  ],
  [
    3,
    "박싸피",
    "010-2222-3333",
    "ccc@ccc.com",
    "2022-01-02",
    "101동/1234호",
    approve(),
    reject(),
  ],
  [
    4,
    "최싸피",
    "010-6666-6666",
    "ddd@ddd.com",
    "2022-01-02",
    "101동/1232호",
    approve(),
    reject(),
  ],
  [
    5,
    "김아무개",
    "010-5555-5555",
    "fff@fff.com",
    "2022-01-02",
    "101동/7894호",
    approve(),
    reject(),
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

const Approval = () => {
  return (
<>
        <NavElements />
        <div className="container mx-auto p-4 mt-3">
          <div className="flex justify-end items-center mb-6 mr-6"></div>
          <Table headers={headers} data={data} />
          <Pagination maxPage={1}  />
        </div>
    </>
  );
};

export default Approval;
