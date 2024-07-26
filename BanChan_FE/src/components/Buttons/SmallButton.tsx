// import React from "react";

const SmallButton = ({
  title = "",
  bgColor = "",
  txtColor = "",
  borderColor = "",
}) => {
  return (
    <button
      className={`${bgColor} ${txtColor} ${borderColor} w-[120px] h-[35px] rounded-[20px] border-2 shadow-custom`}
    >
      {title}
    </button>
  );
};

export default SmallButton;
