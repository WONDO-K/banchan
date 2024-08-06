import Nav from "../Nav";
import NavItem from "../NavItem";
import Sorting from "../Sorting";
import Pagination from "../Pagination";
import TempTable from "../TempTable";
import LargeButton from "../Buttons/LargeButton";

interface dataType {
  id:number,
  title:string
  writer:string,
  startDate:string,
  endDate:string,
  voteRate:string,
}

const vote:{crt_page:number, max_page:number, data:dataType[]} = {
  crt_page : 3,
  max_page : 10,
  data : [
    {
      id:1,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:2,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:3,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:4,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:5,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:6,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:7,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:8,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:9,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },{
      id:10,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
      voteRate : '23%'
    },
  ]
}
const header:string[] = [
  'id','title','writer','voteDate','voteRate'
]
const fixVote = vote.data.map((items) => {
  return {
    ...items,
    voteDate: `${items.startDate.replace('T',' ').slice(0,-3)} ~ ${items.endDate.replace('T',' ').slice(0,-3)}`
  }
})
const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/vote/active" label="진행중인 투표" />
      <NavItem to="/vote/finish" label="완료된 투표" />
    </Nav>
  );
};

const ActiveVote = () => {
  return (
    <>
    <NavElements />
    <div className="container mx-auto p-4 mt-3">
      <div className="flex justify-end items-center mb-6 mr-6">
        <Sorting/>
          <LargeButton title="투표 생성" to="/vote/create"></LargeButton>
        </div>
        <TempTable headerProp={header}data={fixVote} />
        <Pagination maxPage = {2} />
      </div>
    </>
  );
};

export default ActiveVote;
