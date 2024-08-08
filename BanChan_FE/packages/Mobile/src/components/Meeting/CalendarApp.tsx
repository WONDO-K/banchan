import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../App.css";
// import moment from "moment";
import "moment/locale/ko";

const CalendarApp: React.FC = () => {
  // const [value, setValue] = useState(new Date());

  return (
    <div>
      <h2 className="mt-4 text-[20px] calendarHeader">날짜를 선택해주세요.</h2>

      <div className="flex flex-col items-center justify-center">
        <Calendar
          locale="ko"
          // onChange={onChange}
          // value={value}
          next2Label={null}
          prev2Label={null}
          // formatDay={(locale, date) => moment(date).format("D")}
          // tileContent={addContent}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
