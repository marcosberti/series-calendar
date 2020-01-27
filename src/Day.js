import React, { useState, useEffect, useContext } from "react";
import ShowList from "./ShowList";
import DateContext from "./DateContext";
import utils from "./utils";

const Day = props => {
  const [date] = useContext(DateContext);
  const { day, dayClass } = props;
  const [shows, setShows] = useState([]);

  useEffect(() => {
    if (day.date !== 0) {
      const date = utils.formatDate(day);
      if (date == "2020-01-26") {
        utils.getShows(date).then(showsResult => setShows(showsResult));
        //   //TODO: DELETE TEST
      }
    }
  }, [date]);

  return (
    <div className={dayClass}>
      <div className="day-info">
        <span className="day-date">{day.date}</span>{" "}
        <span className="day-name">{day.dayName}</span>
      </div>
      <div className="day-shows">
        <ShowList shows={shows} />
      </div>
    </div>
  );
};

export default Day;
