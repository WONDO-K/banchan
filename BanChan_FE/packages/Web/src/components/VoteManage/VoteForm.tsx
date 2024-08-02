import React from 'react';

interface Options {
  id: number;
  option_text: string;
}

interface VoteQuestionForm {
  question_id: number;
  question_text: string;
  options: Options[];
}

interface VoteFormProps {
  question: VoteQuestionForm;
  voteSelection: (questionId: number, optionId: number) => void;
  selectedOption: number | null;
}

const VoteForm: React.FC<VoteFormProps> = ({ question, voteSelection, selectedOption }) => {

  const handleOptionChange = (optionId: number) => {
    voteSelection(question.question_id, optionId);
  };

  return (
    <div className="p-4 mb-4 mx-auto flex flex-col w-10/12 border rounded-3xl shadow-md text-center">
      <h2 className="text-xl font-bold mb-2">{question.question_text}</h2>
      {question.options.map((option) => (
        <div key={option.id} className="mb-2 w-full relative">
          <label className="flex justify-start w-full">
            <input
              type="radio"
              name={`vote-${question.question_id}`}
              value={option.id}
              onChange={() => handleOptionChange(option.id)}
              className="mr-2"
              checked={selectedOption === option.id}
            />
            <div className="flex-1 p-2 relative z-10 text-center">
              <span className="font-semibold">{option.option_text}</span>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default VoteForm;
