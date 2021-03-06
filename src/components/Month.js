import React, { useContext } from "react";
import Day from "./Day";
import DateContext from "../context/DateContext";
import utils from "../helpers/utils";

const Month = () => {
  const [date] = useContext(DateContext);
  let daysOfMonth = utils.mapDaysOfMonth(date);
  const today = utils.getTodaysDate();

  return (
    <div className="month">
      {daysOfMonth.map((day, index) => (
        <Day
          key={day.year ? `${day.year}-${day.month}-${day.date}` : index}
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
