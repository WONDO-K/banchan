import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { SwipeableContentProps } from "../../Types";

const SwipeableResults: React.FC<SwipeableContentProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) =>
        Math.min(prev + 2, Math.floor((items.length - 1) / 2) * 2)
      ),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 2, 0)),
    trackMouse: true,
  });

  const goToVoteList = () => {
    navigate("/m/voteList");
  };

  // Generating random percentages for each option
  const generateRandomPercentages = (options: string[]) => {
    let remaining = 100;
    const percentages = options.map((_, index) => {
      if (index === options.length - 1) return remaining;
      const percentage = Math.floor(Math.random() * remaining);
      remaining -= percentage;
      return percentage;
    });
    return percentages;
  };

  return (
    <div
      {...handlers}
      className="relative w-full h-[600px] mt-4 overflow-hidden"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / 2) * 100}%)`,
          width: `${Math.ceil(items.length / 2) * 100}%`,
        }}
      >
        {items.map((item, index) => {
          const percentages = generateRandomPercentages(item.options);
          const maxPercentageIndex = percentages.indexOf(
            Math.max(...percentages)
          );
          return index % 2 === 0 ? (
            <div
              key={index}
              className="flex flex-col w-[300px] flex-none"
              style={{ width: "100%" }}
            >
              <div className="w-[300px] p-4 border border-black rounded-2xl bg-white m-4">
                <h4 className="text-lg font-bold">{item.question}</h4>
                <div className="mt-4">
                  {item.options.map((option, optionIdx) => (
                    <p
                      key={optionIdx}
                      className={`text-gray-800 p-2 rounded-md bg-white ${
                        optionIdx === maxPercentageIndex ? "bg-yellow-300" : ""
                      }`}
                    >
                      {option} - {percentages[optionIdx]}%
                    </p>
                  ))}
                </div>
              </div>
              {items[index + 1] && (
                <div className="w-[300px] p-4 border border-black rounded-2xl bg-white m-4">
                  <h4 className="text-lg font-bold">
                    {items[index + 1].question}
                  </h4>
                  <div className="mt-4">
                    {items[index + 1].options.map((option, optionIdx) => (
                      <p
                        key={optionIdx}
                        className={`text-gray-800 p-2 rounded-md bg-white ${
                          optionIdx === maxPercentageIndex
                            ? "bg-yellow-300"
                            : ""
                        }`}
                      >
                        {option} -{" "}
                        {
                          generateRandomPercentages(items[index + 1].options)[
                            optionIdx
                          ]
                        }
                        %
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {currentIndex === index && currentIndex >= items.length - 2 && (
                <div className="flex ml-[130px] ">
                  <button
                    onClick={goToVoteList}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600"
                  >
                    투표 목록
                  </button>
                </div>
              )}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default SwipeableResults;
