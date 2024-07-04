let homeScoreEl = document.getElementById("homeScore");
let guestScoreEl = document.getElementById("guestScore");
let homeScore = 0;
let guestScore = 0;

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
