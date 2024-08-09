import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "../Table";
import Nav from "../Nav";
import NavItem from "../NavItem";
import SmallButton from "../Buttons/SmallButton";
import axios from "axios";

const ModifyButton = ({ handleModify }: { handleModify: () => void }) => {
  return (
    <SmallButton
      title="수정"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customGreen"
      onClick={handleModify}
    />
  );
};

const SaveButton = ({ handleSave }: { handleSave: () => void }) => {
  return (
    <SmallButton
      title="저장"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customBlue"
      onClick={handleSave}
    />
  );
};

const ApproveButton = ({ handleApprove }: { handleApprove: () => void }) => {
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

const RejectButton = ({ handleReject }: { handleReject: () => void }) => {
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

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  address: string;
  approved: boolean;
}

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/userManage/approval" label="신규 승인대기" />
      <NavItem to="/userManage/manage" label="입주민 관리" />
    </Nav>
  );
};

const Manage: React.FC = () => {
  const location = useLocation();
  const newUser: User | undefined = location.state?.user;

  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (newUser) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
  }, [newUser]);

  const startEditing = (user: User) => {
    setEditingId(user.id);
    setEditedUser({ ...user });
  };

  const saveChanges = async () => {
    if (editedUser) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/admin/users/modify/${editedUser.id}`;
        //api url 확인하기
        await axios.put(apiUrl, editedUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );
        setEditingId(null);
        setEditedUser(null);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handleApprove = async (user: User) => {
    try {
      const encodedUsername = encodeURIComponent(user.name);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/admin/users/approval/${encodedUsername}`;
      await axios.post(apiUrl);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, approved: true } : u
        )
      );
      alert("사용자가 승인되었습니다.");
    } catch (error) {
      console.error("Error approving user:", error);
      alert("사용자 승인이 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleReject = async (user: User) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/admin/users/reject/${user.id}`;
      await axios.post(apiUrl);
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== user.id)
      );
      alert("사용자가 거절되었습니다.");
    } catch (error) {
      console.error("Error rejecting user:", error);
      alert("사용자 거절이 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const headers = ["번호", "이름", "연락처", "이메일", "신청일", "동/호수", "수정", "승인", "거절"];

  const rows = users.map((user) =>
    editingId === user.id ? (
      [
        user.id,
        <input
          type="text"
          name="name"
          value={editedUser?.name}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="phone"
          value={editedUser?.phone}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="email"
          value={editedUser?.email}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="date"
          value={editedUser?.date}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="address"
          value={editedUser?.address}
          onChange={handleChange}
        />,
        <SaveButton handleSave={saveChanges} />,
        <ApproveButton handleApprove={() => handleApprove(user)} />,
        <RejectButton handleReject={() => handleReject(user)} />
      ]
    ) : (
      [
        user.id,
        user.name,
        user.phone,
        user.email,
        user.date,
        user.address,
        <ModifyButton handleModify={() => startEditing(user)} />,
        user.approved ? "승인됨" : <ApproveButton handleApprove={() => handleApprove(user)} />,
        <RejectButton handleReject={() => handleReject(user)} />
      ]
    )
  );

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

export default Manage;
