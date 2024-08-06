import React from "react";
import VoteEndForm from "./VoteEndForm";
import BackButton from "../Buttons/BackButton";

const VoteEnd: React.FC = () => {
  // axios요청으로 voteData 안에 데이터 담아야함
  const voteData = {
    vote_id: 1,
    title: "투표 제목",
    content: "투표 본문 내용",
    question_results: [
      {
        question_id: 1,
        question_text: "투표 입니다.",
        option_results: [
          {
            option_id: 1,
            option_text: "Yes",
            vote_count: 283,
          },
          {
            option_id: 2,
            option_text: "No",
            vote_count: 54,
          },
        ],
      },
      {
        question_id: 2,
        question_text: "투표 2안 입니다.",
        option_results: [
          {
            option_id: 1,
            option_text: "1번마",
            vote_count: 23,
          },
          {
            option_id: 2,
            option_text: "2번마",
            vote_count: 172,
          },
          {
            option_id: 2,
            option_text: "3번마",
            vote_count: 142,
          },
        ],
      },
    ],
  };

  const Contents = () => {
    return (
      // 백엔드로 POST 요청 보내는 로직 필요
      // 투표 가져오는 로직, submit 했을 시 투표 결과 보내는 로직 및 투표 틀 만들기 필요
      <form>
        {/* 제목 */}
        <div>
          <h2 className="text-base m-2 text-customTextColor">제목</h2>
          <p className="w-full h-14   bg-customBackgroundColor text-base p-3 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform">
            {voteData.title}
          </p>
        </div>
        {/* 내용 */}
        <div>
          <h2 className="text-base m-2 text-customTextColor">내용</h2>
          {/* 본문 */}
          <div className="w-full h-[350px] overflow-y-auto bg-customBackgroundColor resize-none text-base px-4 py-2 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform">
            <p className=" whitespace-pre-wrap">{voteData.content}</p>
            {voteData.question_results.map((vote) => (
              <VoteEndForm vote={vote} />
            ))}
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="p-8">
      <div className="">
        <div className="flex justify-start p-5">
          <BackButton />
          <h3 className="text-3xl	font-semibold">투표 상세</h3>
        </div>
        <div className="min-w-full min-h-[700px] p-6 bg-white border rounded-[20px] overflow-hidden">
          <Contents />
        </div>
      </div>
    </div>
  );
};

export default VoteEnd;
