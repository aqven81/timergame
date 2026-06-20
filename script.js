var button = document.getElementById("startButton");

let targetTime = 0;
let gameStarted = false;
let p1Stopped = false;
let p2Stopped = false;
let p1Time = 0;
let p2Time = 0;
let gameInterval;

setTimeout(function() { 
  button.style.top = "50%";
}, 500);

setTimeout(function() { 
  button.style.transition = "all 0.2s";
}, 600);

function start() {
  button.style.transition = "all 0.7s";
  button.style.top = "55%";
  button.style.pointerEvents = "none";
  document.getElementById("startDarkBg").style.transition = "all 1s";


  setTimeout(function() {
    button.style.top = "-10%";
    document.getElementById("startDarkBg").style.opacity = "0";

    showTargetTime();
  }, 700);
}

function showTargetTime() {

  targetTime = (Math.floor(Math.random() * 26) + 15) / 2;

  let currentTime = 0;

  const animation = setInterval(() => {
    currentTime += 0.1;
    document.getElementById("timer").innerText = currentTime.toFixed(1);
    document.getElementById("trafficlight").style.top = "20%";

    if (currentTime >= targetTime) {
      document.getElementById("timer").innerText = targetTime.toFixed(1);
      clearInterval(animation);

    setTimeout(function() {
    document.getElementById("tl1").style.background = "#db0000";
    setTimeout(function() {
      document.getElementById("tl2").style.background = "#db0000";
      setTimeout(function() {
        document.getElementById("tl1").style.background = "#17c200";
        document.getElementById("tl2").style.background = "#17c200";
        document.getElementById("tl3").style.background = "#17c200";

        setTimeout(function() {
          document.getElementById("trafficlight").style.top = "-20%";
        }, 2000);
      }, 1000);
    }, 1000);
    }, 1000);
      setTimeout(startPlayerTimers, 3000);
    }
  }, 30);
}

function startPlayerTimers() {
  gameStarted = true;
  p1Stopped = false;
  p2Stopped = false;
  p1Time = 0;
  p2Time = 0;

  setTimeout(function() {
    document.getElementById("p1Timer").style.background = "#000";
    document.getElementById("p2Timer").style.background = "#000";
  }, 3000);

  document.getElementById("p1Timer").innerText = "0.0";
  document.getElementById("p2Timer").innerText = "0.0";
  document.getElementById("winner").innerText = "";

  gameInterval = setInterval(() => {
    if (!p1Stopped) {
      p1Time += 0.1;
      document.getElementById("p1Timer").innerText = p1Time.toFixed(1);
    }

    if (!p2Stopped) {
      p2Time += 0.1;
      document.getElementById("p2Timer").innerText = p2Time.toFixed(1);
    }
  }, 100);
}

document.addEventListener("keydown", function(event) {
  if (!gameStarted) return;

  if (event.key.toLowerCase() === "s" && !p1Stopped) {
    p1Stopped = true;
    document.getElementById("p1Timer").style.border = "20px solid #17c200";
  }

  if (event.key.toLowerCase() === "l" && !p2Stopped) {
    p2Stopped = true;
    document.getElementById("p2Timer").style.border = "20px solid #17c200";
  }

  if (p1Stopped && p2Stopped) {
    endGame();
  }
});

function endGame() {
  gameStarted = false;
  clearInterval(gameInterval);

setTimeout(function() {
  document.getElementById("p1Timer").style.background = "#cecece";
  document.getElementById("p2Timer").style.background = "#cecece";

setTimeout(function() {
  document.getElementById("winner").style.top = "20%";

if (p1Difference < p2Difference) {
    document.getElementById("p1Box").style.transform = "scale(1.15)";
    document.getElementById("p2Box").style.transform = "scale(0.85)";
    document.getElementById("p2Box").style.filter = "brightness(70%)";
  } else if (p2Difference < p1Difference) {
    document.getElementById("p2Box").style.transform = "scale(1.15)";
    document.getElementById("p1Box").style.transform = "scale(0.85)";
    document.getElementById("p1Box").style.filter = "brightness(70%)";
  } else {
    document.getElementById("winner").innerText = "Draw!";
  }
  document.getElementById("restart").style.bottom = "25%";
  }, 2000);
}, 3000);

  let p1Difference = Math.abs(targetTime - p1Time);
  let p2Difference = Math.abs(targetTime - p2Time);

  if (p1Difference < p2Difference) {
    document.getElementById("winner").innerText = "Player 1 wins!";
  } else if (p2Difference < p1Difference) {
    document.getElementById("winner").innerText = "Player 2 wins!";
  } else {
    document.getElementById("winner").innerText = "Draw!";
  }
}