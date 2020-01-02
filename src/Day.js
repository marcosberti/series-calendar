import React from "react";

const Day = props => {
  const { day, dayClass } = props;
  return (
    <div className={dayClass}>
      <div className="day-info">
        <span className="day-date">{day.date}</span>{" "}
        <span className="day-name">{day.dayName}</span>
      </div>
      <div className="day-shows">{/* <p>show test</p> */}</div>
    </div>
  );
};

export default Day;
