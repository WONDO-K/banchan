import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../Table";
import Nav from "../Nav";
import NavItem from "../NavItem";
import SmallButton from "../Buttons/SmallButton";

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  address: string;
  status: string;
}

const approve = (handleApprove: () => void) => {
  return (
    <SmallButton
      title="승인"
      bgColor="bg-white"
      txtColor="text-customBlue"
      borderColor="border-customBlue"
      onClick={handleApprove}
    />
  );
};

const reject = (handleReject: () => void) => {
  return (
    <SmallButton
      title="거절"
      bgColor="bg-white"
      txtColor="text-customRed"
      borderColor="border-customRed"
      onClick={handleReject}
    />
  );
};

const headers = ["번호", "이름", "연락처", "이메일", "신청일", "동/호수", "승인", "거절"];

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/userManage/approval" label="신규 승인대기" />
      <NavItem to="/userManage/manage" label="입주민 관리" />
    </Nav>
  );
};

const Approval: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/users/list`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (user: User) => {
    try {
      const encodedUsername = encodeURIComponent(user.name);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/admin/users/approval/${encodedUsername}`;
      await axios.post(apiUrl);
      navigate("/userManage/manage", { state: { user } });
    } catch (error) {
      console.error("Error approving user:", error);
      alert("사용자 승인이 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleReject = (id: number) => {
    console.log(`User with ID ${id} rejected.`);
    alert("사용자가 거절되었습니다.");
  };

  const rows = data
    .filter(user => user.status === 'pending')
    .map(user => [
      user.id,
      user.name,
      user.phone,
      user.email,
      user.date,
      user.address,
      approve(() => handleApprove(user)),
      reject(() => handleReject(user.id)),
    ]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6"></div>
        <Table headers={headers} data={rows} />
      </div>
    </>
  );
};

export default Approval;
