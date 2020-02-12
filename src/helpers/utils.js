const API_URL = "http://api.tvmaze.com/schedule?date=";

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

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];

function getDaysOfMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayOfDate(date, month, year) {
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

  daysOfMonth = checkUncompletedWeeks(daysOfMonth);

  return daysOfMonth;
}

function checkUncompletedWeeks(daysOfMonth) {
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
  try {
    const response = await fetch(`${API_URL}${date}`);
    if (response.ok) {
      return await response.json();
    } else {
      return new Promise(resolve => {
        resolve([]);
      });
    }
  } catch (err) {
    return new Promise(resolve => {
      resolve([]);
    });
  }
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
