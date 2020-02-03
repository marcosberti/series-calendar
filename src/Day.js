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
      utils
        .getShows(date)
        .then(showsResult => setShows(showsResult))
        .catch(err => {
          setShows([]);
          console.error(err, "day err");
        });
      // if (date == "2020-02-23") {
      //   //   //TODO: DELETE TEST
      // }
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
