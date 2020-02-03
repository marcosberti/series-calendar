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
  if (isOnline) {
    try {
      const response = await fetch(
        `http://api.tvmaze.com/schedule?date=${date}`
      );
      if (response.ok) {
        return await response.json();
      } else {
      }
    } catch (err) {
      return Promise.resolve([]);
    }
  } else {
    return Promise.resolve([]);
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

/* SW */

var isOnline = "onLine" in navigator && navigator.onLine;
var svcworker;
var swRegistration;

async function initServiceWorker() {
  const usingSW = "serviceWorker" in navigator;
  if (usingSW) {
    swRegistration = await navigator.serviceWorker.register(
      "/serviceworker.js",
      {
        updateViaCache: "none"
      }
    );

    svcworker =
      swRegistration.installing ||
      swRegistration.waiting ||
      swRegistration.active;
    sendStatusUpdate(svcworker);

    // listen for new service worker to take over
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      async function onController() {
        svcworker = navigator.serviceWorker.controller;
        sendStatusUpdate(svcworker);
      }
    );
  }

  // navigator.serviceWorker.addEventListener("message", onSWMessage, false);

  window.addEventListener(
    "online",
    function online() {
      // offlineIcon.classList.add("hidden");
      isOnline = true;
      sendStatusUpdate();
    },
    false
  );

  window.addEventListener(
    "offline",
    function offline() {
      // offlineIcon.classList.remove("hidden");
      isOnline = false;
      sendStatusUpdate();
    },
    false
  );
}

function sendStatusUpdate(target) {
  sendSWMessage({ statusUpdate: { isOnline } }, target);
}

function sendSWMessage(msg, target) {
  if (target) {
    target.postMessage(msg);
  } else if (svcworker) {
    svcworker.postMessage(msg);
  } else if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}

// function onSWMessage(evt) {
//   var { data } = evt;
//   if (data.statusUpdateRequest) {
//     console.log("Status update requested from service worker, responding...");
//     sendStatusUpdate(evt.ports && evt.ports[0]);
//   }
// }

const utils = {
  mapDaysOfMonth,
  getMonthName,
  getTodaysDate,
  getShows,
  formatDate,
  initServiceWorker
};

export default utils;
