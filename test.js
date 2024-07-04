let timerInterval;
let totalTime = 0;

document.getElementById("set-timer").addEventListener("click", () => {
  const timeInput = document.getElementById("timeInput").value;

  if (!timeInput) {
    showMessage("Please set the timer to start the game.", "red");
    return;
  }

  const timeParts = timeInput.split(":");
  if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
    showMessage("Invalid time format. Please use MM:SS format.", "red");
    return;
  }

  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);
  totalTime = minutes * 60 + seconds;

  if (totalTime <= 0) {
    showMessage("Timer must be set to a positive time.", "red");
    return;
  }

  showMessage("Timer set successfully!", "green");

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(totalTime);
});

document.getElementById("start-game").addEventListener("click", () => {
  if (totalTime <= 0) {
    showMessage("Please set the timer to start the game.", "red");
    return;
  }

  startCountdown();
});

function startCountdown() {
  const timerElement = document.getElementById("timer");

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      showMessage("Time is up!", "red");
      // Additional logic to handle end of game can go here
      return;
    }
    totalTime--;
    timerElement.textContent = formatTime(totalTime);
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

function showMessage(message, color) {
  const popup = document.getElementById("message-popup");
  const messageText = document.getElementById("message-text");

  messageText.textContent = message;
  messageText.style.color = color;

  popup.style.display = "block";
}

function closePopup() {
  document.getElementById("message-popup").style.display = "none";
}
