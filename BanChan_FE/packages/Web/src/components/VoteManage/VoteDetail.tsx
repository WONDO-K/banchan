import React, { useState } from 'react';
import VoteForm from './VoteForm';
import BackButton from "../Buttons/BackButton";
import { Link } from 'react-router-dom';
const VoteDetail: React.FC = () => {
    // axios요청으로 voteData 안에 데이터 담아야함
    const voteData = {
        "id": 1,
        "title": "제목입니다",
        "content": "투표 예시입니다 아무거나 입력할레요 \nhttp://example.com/vote1.jpg 이건 주소에여",
        "start_date": "2024-07-30T15:14:10",
        "end_date": "2024-08-06T15:14:10",
        "created_at": "2024-07-30T15:14:10",
        "questions": [
            {
                "question_id": 1,
                "question_text": "첫번째 투표",
                "options": [
                    {
                        "id": 1,
                        "option_text": "찬성"
                    },
                    {
                        "id": 2,
                        "option_text": "반대"
                    }
                ]
            },
            {
                "question_id": 2,
                "question_text": "두번째 투표",
                "options": [
                    {
                        "id": 1,
                        "option_text": "A안"
                    },
                    {
                        "id": 2,
                        "option_text": "B안"
                    },
                    {
                        "id": 3,
                        "option_text": "C안"
                    }
                ]
            }
        ]
    }
    const [votes, setVotes] = useState<{ [key: number]: number | null }>({});

    const handleVoteChange = (question_id: number, option_id: number) => {
        setVotes((prevVotes) => ({
          ...prevVotes,
          [question_id]: option_id,
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.keys(votes).length === voteData.questions.length){
            const voteResult = Object.keys(votes).map((question_id) => ({
              question_id: Number(question_id),
              option_id: votes[Number(question_id)],
            }));
            const Data = {
                voteId : voteData.id,
                response : voteResult
            }
            console.log(Data);
            // 이 밑에 axios 요청이 들어감
        } else{
            alert('모든 항목에 투표를 해 주세요')
        }
    }

    const Contents = () =>  {
        return (
            // 백엔드로 POST 요청 보내는 로직 필요
            // 투표 가져오는 로직, submit 했을 시 투표 결과 보내는 로직 및 투표 틀 만들기 필요
            <form onSubmit={handleSubmit}>
        {/* 제목 */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>제목</h2>
            <p className="w-full h-14   bg-customBackgroundColor text-base p-3 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform">
                {voteData.title}
            </p>
    
            </div>
        {/* 내용 */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>내용</h2>
            {/* 본문 */}
            <div
            className="w-full h-[350px] overflow-y-auto bg-customBackgroundColor resize-none text-base px-4 py-2 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform"
            >
            <p className=' whitespace-pre-wrap'>
                {voteData.content}
           </p>

            {
                voteData.questions.map((question)=>(
                    <VoteForm 
                    key={question.question_id}
                    question={question}
                    voteSelection={handleVoteChange}
                    selectedOption={Object.hasOwnProperty.call(votes, question.question_id)? votes[question.question_id] : null}
                    />
                    
                )
            )
            }
            </div>
            </div>
        {/* 투표 기간 */}
            <div className='flex justify-end pt-2'>
                <span className='text-sm font-semibold mx-4'>
                    투표 기간 : {voteData.start_date.replace('T',' ').slice(0,-3)} ~ {voteData.end_date.replace('T',' ').slice(0,-3)}
                </span>
            </div>
    {/* 투표 버튼 */}
            <div className='pt-2 flex justify-center'>
            
            <button type='button' className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 정지</button>
            <Link to='/message'>
            <button type='button' className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 알람 전송</button>
            </Link>
            
            <button type='submit' className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 제출</button>

    
            </div>
        </form>
        )
    }

  return (
      <div className="p-8">
      <div className="">
        <div className="flex justify-start p-5">
            <BackButton />
            <h3 className='text-3xl	font-semibold'>투표 상세</h3>
        </div>

        <div className="min-w-full min-h-[700px] p-6 bg-white border rounded-[20px] overflow-hidden">
            <Contents/>
        </div>
      </div>
    </div>
  );
};

export default VoteDetail;
