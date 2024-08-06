import React from "react";

interface SmallButtonProps {
  title?: string;
  bgColor?: string;
  txtColor?: string;
  borderColor?: string;
  onClick?: () => void; // onClick prop 추가
}

const SmallButton: React.FC<SmallButtonProps> = ({
  title = "",
  bgColor = "",
  txtColor = "",
  borderColor = "",
  onClick,
}) => {
  return (
    <button
      className={`${bgColor} ${txtColor} ${borderColor} w-[120px] h-[35px] rounded-[20px] border-2 shadow-custom`}
      onClick={onClick} // onClick 핸들러 연결
    >
      {title}
    </button>
  );
};

export default SmallButton;
