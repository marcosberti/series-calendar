import data from "./test";
// const cacheName = "shows-cache";

function getDaysOfMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayOfDate(date, month, year) {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];
  const day = new Date(year, month, date).getDay();
  return { date, month, year, dayName: days[day], dayNo: day };
}

function mapDaysOfMonth(dateObj) {
  let daysOfMonth = [];
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const lastDay = getDaysOfMonth(month, year);

  for (let i = 1; i <= lastDay; i++) {
    daysOfMonth.push(getDayOfDate(i, month, year));
  }

  daysOfMonth = checkEmptyDays(daysOfMonth);

  return daysOfMonth;
}

function checkEmptyDays(daysOfMonth) {
  const firstDay = daysOfMonth[0];
  const lastDay = daysOfMonth[daysOfMonth.length - 1];
  let fixedDaysOfMonth = daysOfMonth;

  if (firstDay.dayNo !== 0) {
    fixedDaysOfMonth = fillEmptyDays(fixedDaysOfMonth, 0, firstDay.dayNo, true);
  }

  if (lastDay.dayNo !== 6) {
    fixedDaysOfMonth = fillEmptyDays(fixedDaysOfMonth, lastDay.dayNo, 6, false);
  }

  return fixedDaysOfMonth;
}

function fillEmptyDays(daysOfMonth, start, end, addBegin) {
  const emptyDays = [];
  for (let i = start; i < end; i++) {
    emptyDays.push({ date: 0, dayName: "no name", dayNo: 0 });
  }

  if (addBegin) return [...emptyDays, ...daysOfMonth];
  else return [...daysOfMonth, ...emptyDays];
}

function getMonthName(month) {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  return months[month];
}

function getTodaysDate() {
  const date = new Date();
  return {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

async function getShows(date) {
  // return data;
  const response = await fetch(`http://api.tvmaze.com/schedule?date=${date}`);
  if (response.ok) {
    return await response.json();
  } else {
    console.log("error");
  }

  // const cache = await caches.open(cacheName);
  // let shows = await cache.match();
  // console.log(cache);
}

function formatDate(day) {
  const date = day.date < 10 ? `0${day.date}` : day.date;
  const month = formatMonth(day.month);
  const fullDate = `${day.year}-${month}-${date}`;
  return fullDate;
}

function formatMonth(month) {
  let realMonth = month + 1;
  return realMonth < 10 ? `0${realMonth}` : realMonth;
}

const utils = {
  mapDaysOfMonth,
  getMonthName,
  getTodaysDate,
  getShows,
  formatDate
};

export default utils;
