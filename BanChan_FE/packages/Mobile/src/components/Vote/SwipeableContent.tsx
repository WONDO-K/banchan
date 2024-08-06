// src/components/SwipeableContent.tsx
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface SwipeableContentProps {
  items: Array<{ question: string; options: string[] }>;
}

const SwipeableContent: React.FC<SwipeableContentProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    Array(items.length).fill(-1)
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % items.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length),
    trackMouse: true,
  });

  const handleOptionClick = (index: number, optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div
      {...handlers}
      className="relative w-full h-[300px] overflow-hidden mt-4"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full top-0 left-0 transition-transform duration-500 ease-in-out ${
            index === currentIndex
              ? "transform translate-x-0"
              : index < currentIndex
              ? "transform -translate-x-full"
              : "transform translate-x-full"
          }`}
        >
          <div className="p-4 border border-black rounded-2xl bg-white m-4">
            <h4 className="text-lg font-bold">{item.question}</h4>
            <div className="mt-4">
              {item.options.map((option, idx) => (
                <p
                  key={idx}
                  className={`text-gray-800 cursor-pointer p-2 rounded-md ${
                    selectedOptions[index] === idx
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleOptionClick(index, idx)}
                >
                  {option}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwipeableContent;
