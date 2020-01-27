import React, { useState } from "react";
import { render } from "react-dom";
import Month from "./Month";
import DateContext from "./DateContext";
import MonthsBar from "./MonthsBar";

const App = () => {
  const dateHook = useState(new Date());

  return (
    <DateContext.Provider value={dateHook}>
      <header></header>
      <main className="calendar">
        <MonthsBar />
        <Month className="month" path="/" />
        <MonthsBar />
      </main>
      <footer></footer>
    </DateContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
