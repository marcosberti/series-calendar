import React, { useContext } from "react";
import Day from "./Day";
import DateContext from "./DateContext";
import utils from "./utils";

const Month = props => {
  const [date] = useContext(DateContext);
  let daysOfMonth = utils.mapDaysOfMonth(date);
  const today = utils.getTodaysDate();

  return (
    <div className="month">
      {daysOfMonth.map((day, index) => (
        <Day
          key={index}
          day={day}
          dayClass={
            day.date === today.date &&
            day.month === today.month &&
            day.year === today.year
              ? "today"
              : day.date !== 0
              ? "day"
              : "empty-box"
          }
        />
      ))}
    </div>
  );
};

export default Month;
