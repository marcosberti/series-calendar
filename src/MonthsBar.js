import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import DateContext from "./DateContext";
import utils from "./utils";

const MonthsBar = () => {
  const [date, setDate] = useContext(DateContext);
  const year = date.getFullYear();
  const month = date.getMonth();
  let prevMonth = month - 1;
  let prevYear = year;
  let nextMonth = month + 1;
  let nextYear = year;

  if (month === 0) {
    prevMonth = 11;
    prevYear = year - 1;
  } else if (month === 11) {
    nextMonth = 0;
    nextYear = year + 1;
  }

  const handleClick = (month, year) => {
    setDate(new Date(year, month, 1));
  };

  return (
    <ul className="months-bar">
      <li className="prev-month">
        <div
          onClick={() => {
            handleClick(prevMonth, prevYear);
          }}
        >
          <span className="month-navigation-icon">
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </span>
          <span className="prev-month-name">
            {utils.getMonthName(prevMonth)} {prevYear}
          </span>
        </div>
      </li>
      <li className="current-month">
        Episodios de {utils.getMonthName(month)} {year}
      </li>
      <li className="next-month">
        <div
          onClick={() => {
            handleClick(nextMonth, nextYear);
          }}
        >
          <span className="next-month-name">
            {utils.getMonthName(nextMonth)} {nextYear}
          </span>
          <span className="month-navigation-icon">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </div>
      </li>
    </ul>
  );
};

export default MonthsBar;
