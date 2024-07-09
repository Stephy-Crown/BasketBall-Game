let timerInterval;
let totalTime = 0;
let lastTimeInput = ""; // To store the last valid time input as a string

let homeScoreEl = document.getElementById("homeScore");
let guestScoreEl = document.getElementById("guestScore");
let homeScore = 0;
let guestScore = 0;

document.getElementById("new-game-button").addEventListener("click", () => {
  const timeInput = document.getElementById("timeInput").value;

  if (!timeInput) {
    showModal("Please set the timer to start the game.", "red");
    return;
  }

  const timeParts = timeInput.split(":");
  if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
    showModal("Invalid time format. Please use MM:SS format.", "red");
    return;
  }

  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);
  totalTime = minutes * 60 + seconds;

  if (totalTime <= 0) {
    showModal("Timer must be set to a positive time.", "red");
    return;
  }

  const timerElement = document.getElementById("timer");
  console.log(timerElement);
  timerElement.textContent = formatTime(totalTime);
  startCountdown();
});

document.getElementById("set-timer").addEventListener("click", () => {
  const timeInputField = document.getElementById("timeInput");
  const timeInput = timeInputField.value;

  if (!timeInput) {
    showModal("Please set the timer to start the game.", "red");
    return;
  }

  const timeParts = timeInput.split(":");
  if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
    showModal("Invalid time format. Please use MM:SS format.", "red");
    return;
  }

  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);
  totalTime = minutes * 60 + seconds;
  remainingTime = totalTime;
  lastTimeInput = timeInput; // Store the last valid time input

  if (totalTime <= 0) {
    showModal("Timer must be set to a positive time.", "red");
    return;
  }

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(totalTime);

  showModal("Timer set successfully! You can start the game.", "green");
  // Clear the time input field

  timeInputField.value = "";
  timeInputField.focus();
});

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function showModal(message, color) {
  const modal = document.getElementById("message-modal");
  const messageText = document.getElementById("message-text");

  messageText.textContent = message;
  messageText.style.color = color;

  modal.style.display = "flex";
  document.getElementById("blur-background").style.filter = "blur(5px)";
}

function closeModal() {
  document.getElementById("message-modal").style.display = "none";
  document.getElementById("blur-background").style.filter = "none";
}

// RESET, PAUSE, AND CONTINUE TIMER BUTTON
let remainingTime = 0;
let isPaused = false;

let initialTime = 0; // To store the initial set time

document.getElementById("pause-timer").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    isPaused = true;
  }
});

document.getElementById("continue-timer").addEventListener("click", () => {
  if (isPaused) {
    startCountdown();
    isPaused = false;
  }
});

document.getElementById("reset-button").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  remainingTime = initialTime; // Reset to the initial set time
  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(remainingTime);

  // Reset scores
  homeScore = 0;
  guestScore = 0;
  homeScoreEl.textContent = homeScore;
  guestScoreEl.textContent = guestScore;
});

document.getElementById("reset-timer").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  const timeParts = lastTimeInput.split(":");
  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);
  remainingTime = minutes * 60 + seconds;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(remainingTime);
});

function startCountdown() {
  const timerElement = document.getElementById("timer");
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      announceWinner();
      return;
    }

    remainingTime--;
    timerElement.textContent = formatTime(remainingTime);
  }, 1000);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

// CHECK WINNER
function announceWinner() {
  let homeScore = parseInt(homeScoreEl.textContent);
  let guestScore = parseInt(guestScoreEl.textContent);
  const timerElement = document.getElementById("timer");

  if (homeScore > guestScore) {
    showModal(
      `HOME:${homeScore} 
      GUEST:${guestScore}
      HOME WON With ${homeScore}  Points!`,
      "green"
    );
  } else if (guestScore > homeScore) {
    showModal(
      `HOME:${homeScore} 
      GUEST:${guestScore}
      GUEST WON With ${guestScore} Points!`,
      "green"
    );
  } else {
    showModal("It's a tie", "orange");
  }
}

function showModal(message, color) {
  const modal = document.getElementById("message-modal");
  const messageText = document.getElementById("message-text");

  messageText.textContent = message;
  messageText.style.color = color;

  modal.style.display = "flex";
  document.getElementById("blur-background").style.filter = "blur(5px)";
}

function closeModal() {
  document.getElementById("message-modal").style.display = "none";
  // document.getElementById("blur-background").style.filter = "none";
}

function homeCounter() {
  // Home fouls counter logic
  let foulElement = document.getElementById("home-foul");
  foulElement.textContent = `:${
    parseInt(foulElement.textContent.slice(1)) + 1
  }`;
}

function guestCounter() {
  // Guest fouls counter logic
  let foulElement = document.getElementById("guest-foul");
  foulElement.textContent = parseInt(foulElement.textContent) + 1;
}

function incrementScore(team, points) {
  if (team === "home") {
    homeScore += points;
    homeScoreEl.textContent = homeScore;
  } else if (team === "guest") {
    guestScore += points;
    guestScoreEl.textContent = guestScore;
  }
}
function OneIncrement(team) {
  incrementScore(team, 1);
}

function TwoIncrement(team) {
  incrementScore(team, 2);
}

function ThreeIncrement(team) {
  incrementScore(team, 3);
}

// Counter for foul button
let homeCount = 0;
let guestCount = 0;
let homeFoulEl = document.getElementById("home-foul");
let guestFoulEl = document.getElementById("guest-foul");
function homeCounter() {
  homeCount += 1;
  // console.log(count);
  homeFoulEl.textContent = "⏩" + homeCount;
}

function guestCounter() {
  guestCount += 1;
  // console.log(count);
  guestFoulEl.textContent = "⏩" + guestCount;
}
