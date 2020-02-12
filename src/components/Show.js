import React from "react";

const Show = ({ show }) => {
  const season = show.season < 10 ? `0${show.season}` : show.season;
  const episode = show.number < 10 ? `0${show.number}` : show.number;

  return (
    <div className="show">
      <span className="show-name">{show.show.name}</span>
      <span className="show-episode">{show.name}</span>
      <span className="show-episode-number">{`s${season}e${episode}`}</span>
    </div>
  );
};

export default Show;
