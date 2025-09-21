
// Exercise 1: PLANT
const slider = document.getElementById("daysSlider");
const output = document.getElementById("daysOutput");
const message = document.getElementById("plantMessage");
const image = document.getElementById("plantImage");

slider.addEventListener("input", () => {
  const days = parseInt(slider.value);
  const dayText = "It's been " + days + (days > 1 ? " days" : " day") + " since watering your plant.<br>";
  let fullMessage = "";

  if (days >= 1 && days <= 2) {
    fullMessage = dayText + "Your plant is healthy and happy!";
    image.src = "images/plantimage.png";
    image.alt = "Healthyplant";
  } else if (days >= 3 && days <= 5) {
    fullMessage = dayText + "Your plant needs watering.";
    image.src = "images/plantimage1.png";
    image.alt = "plant";
  } else if (days >= 6 && days <= 9) {
    fullMessage = dayText + "Leaves are dropping, water soon.";
    image.src = "images/plantimage2.png";
    image.alt = "plant dying";
  } else if (days >= 10 && days <= 12) {
    fullMessage = dayText + "Sorry, your plant is no longer with us.";
    image.src = "images/plantimage3.png";
    image.alt = "Dead";
  } else {
    fullMessage = "";
    image.src = "";
    image.alt = "";
  }

  message.innerHTML = fullMessage;
});

// Exercise 2: clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const timeString = `${hours}:${minutes} ${ampm}`;  
  const clockDisplay = document.getElementById("clockDisplay");
  if (clockDisplay) {
    clockDisplay.textContent = timeString;
  }
}

setInterval(updateClock, 60000);
updateClock();

function toggleMenu() {
  const menu = document.getElementById("menuItems");
  const toggle = document.getElementById("menuToggle");

  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    toggle.textContent = "▼";
  } else {
    menu.classList.add("show");
    toggle.textContent = "▲";
  }
}

function showExercise(num) {
  document.getElementById("exercise1").classList.add("hidden");
  document.getElementById("exercise2").classList.add("hidden");

  const target = document.getElementById("exercise" + num);
  if (target) {
    target.classList.remove("hidden");
  }
}

