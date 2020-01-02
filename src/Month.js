import React, { useContext } from "react";
import utils from "./utils";
import Day from "./Day";
import DateContext from "./DateContext";

const Month = props => {
  const [date] = useContext(DateContext);
  const daysOfMonth = utils.mapDaysOfMonth(date);
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
              : "no-day"
          }
        />
      ))}
    </div>
  );
};

export default Month;
