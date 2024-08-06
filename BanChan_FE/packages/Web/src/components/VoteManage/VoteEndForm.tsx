import React from 'react';

interface VoteItemForm {
  option_id: number;
  option_text: string;
  vote_count: number;
}

interface VoteFormProps {
  vote: {
    question_id: number;
    question_text: string;
    option_results: VoteItemForm[];
  };
}

const VoteEndForm: React.FC<VoteFormProps> = ({ vote }) => {
  const totalVotes = vote.option_results.reduce((sum, option) => sum + option.vote_count, 0);
  const maxVoteCount = Math.max(...vote.option_results.map(option => option.vote_count));

  return (
    <div className="p-4 mb-4 mx-auto flex flex-col w-10/12 border rounded-3xl shadow-md text-center">
      <h2 className="text-xl font-bold mb-2">{vote.question_text}</h2>
      {vote.option_results.map((option) => {
        const votePercentage = (option.vote_count / totalVotes) * 100;
        const isMaxVote = option.vote_count === maxVoteCount;

        return (
          <div key={option.option_id} className="mb-2 w-full relative flex items-center">
            <div className="flex-1 p-2 relative z-10 text-left">
              <span className="font-semibold">{option.option_text}</span>
            </div>
            <div className="p-2 relative z-10 text-right">
              <span className="ml-2">
                {votePercentage.toFixed(2)}% ({option.vote_count} 표)
              </span>
            </div>
            <div
              className={`absolute left-0 top-0 h-full ${isMaxVote ? 'bg-green-200' : 'bg-blue-200'}`}
              style={{
                width: `${votePercentage}%`,
                zIndex: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VoteEndForm;
