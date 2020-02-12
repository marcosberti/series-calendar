import React from "react";
import { render } from "react-dom";
import App from "./components/App";

render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", {
      updateViaCache: "none"
    })
    .then()
    .catch();
}

// (async function initServiceWorker() {
//   if ("serviceWorker" in navigator) {
//     const swRegistration = await navigator.serviceWorker.register("/sw.js", {
//       updateViaCache: "none"
//     });

//     const svcworker =
//       swRegistration.installing ||
//       swRegistration.waiting ||
//       swRegistration.active;
//     // sendStatusUpdate(svcworker);

//     // listen for new service worker to take over
//     navigator.serviceWorker.addEventListener(
//       "controllerchange",
//       async function onController() {
//         svcworker = navigator.serviceWorker.controller;
//         sendStatusUpdate(svcworker);
//       }
//     );

//     navigator.serviceWorker.addEventListener("message", onSWMessage, false);

//     window.addEventListener(
//       "online",
//       function online() {
//         // offlineIcon.classList.add("hidden");
//         // isOnline = true;
//         // sendStatusUpdate();
//       },
//       false
//     );

//     window.addEventListener(
//       "offline",
//       function offline() {
//         // offlineIcon.classList.remove("hidden");
//         // isOnline = false;
//         // sendStatusUpdate();
//       },
//       false
//     );
//   }
// })();

// function sendStatusUpdate(target) {
//   sendSWMessage({ statusUpdate: { isOnline } }, target);
// }

// function sendSWMessage(msg, target) {
//   if (target) {
//     target.postMessage(msg);
//   } else if (svcworker) {
//     svcworker.postMessage(msg);
//   } else if (navigator.serviceWorker.controller) {
//     navigator.serviceWorker.controller.postMessage(msg);
//   }
// }

// function onSWMessage(evt) {
//   const { data } = evt;
//   if (data.updateLocation) {
//     window.location.reload();
//   }
// }
