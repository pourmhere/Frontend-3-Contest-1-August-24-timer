const setButton = document.getElementById("setButton");
const timersContainer = document.getElementById("timersContainer");
const alarmSound = document.getElementById("alarmSound");

setButton.addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0) {
    addTimer(totalSeconds);
  }
});

function addTimer(duration) {
  const timerElement = document.createElement("div");
  timerElement.className = "timer";

  const timeLeft1 = document.createElement("span");
  timeLeft1.textContent = "Time Left :";
  timerElement.appendChild(timeLeft1);

  const timeLeft = document.createElement("span");
  timeLeft.textContent = formatTime(duration);
  timerElement.appendChild(timeLeft);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    clearInterval(interval);
    timersContainer.removeChild(timerElement);
    checkEmptyTimers();
  });
  timerElement.appendChild(deleteButton);

  const interval = setInterval(() => {
    duration--;
    timeLeft.textContent = formatTime(duration);
    if (duration <= 0) {
      clearInterval(interval);
      timeLeft.textContent = "Time Is Up!";
      timerElement.style.backgroundColor = "#f0f757";
      deleteButton.style.backgroundColor = "#34344a";
      timeLeft1.textContent = "";
      timeLeft.style.fontSize = "26px";
      timeLeft.style.fontWeight = "bold";
      timeLeft.style.color = "#000";
      deleteButton.textContent = "Stop";
      deleteButton.style.color = "#ffffff";
      alarmSound.play();
    }
  }, 1000);

  timersContainer.appendChild(timerElement);
  checkEmptyTimers();
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h} : ${m} : ${s}`;
}

function checkEmptyTimers() {
  if (timersContainer.children.length === 0) {
    timersContainer.innerHTML = "<p>You have no timers currently!</p>";
  } else {
    const emptyMessage = timersContainer.querySelector("p");
    if (emptyMessage) {
      timersContainer.removeChild(emptyMessage);
    }
  }
}

document.getElementById("hours").addEventListener("blur", function () {
  let value = this.value;
  if (value.length === 1) {
    this.value = "0" + value; // Add leading zero if there's only one digit
  }
});
document.getElementById("minutes").addEventListener("blur", function () {
  let value = this.value;
  if (value.length === 1) {
    this.value = "0" + value; // Add leading zero if there's only one digit
  }
});
document.getElementById("seconds").addEventListener("blur", function () {
  let value = this.value;
  if (value.length === 1) {
    this.value = "0" + value; // Add leading zero if there's only one digit
  }
});
