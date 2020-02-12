import React from "react";
import Show from "./Show";

const ShowList = ({ shows }) => {
  const visibleShows = shows.length > 5 ? shows.slice(0, 5) : shows;

  return (
    <div>
      {visibleShows.map((show, index) => (
        <Show key={index} show={show} />
      ))}
    </div>
  );
};

export default ShowList;
