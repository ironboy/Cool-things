// A log helper that listens to url/route changes triggered by the frontend
// (that the backend normally does not know about)
// so that we can send info  about them to the backend

// Listen to push state (clicks on meny links etc)
// by monkey patching window.history.pushState
let orginalPushState = window.history.pushState;
window.history.pushState = function (...args) {
  orginalPushState.apply(this, args);
  tellBackendToLog();
};

// Also listen to pop state 
// (the user navigating with the back/forward buttons of the browser)
window.onpopstate = tellBackendToLog;

// Tell the backend to log
function tellBackendToLog() {
  console.log(location.pathname);
}