const counterEl = document.getElementById("counter");
const counterValueEl = counterEl.querySelector(".counter-value");
const counterBgEl = document.getElementById("counterBg");
const timestampEl = document.getElementById("timestamp");

const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");
const themeButtons = document.querySelectorAll(".theme-btn");

let count = parseInt(localStorage.getItem("count")) || 0;
let lastUpdated = localStorage.getItem("lastUpdated") || "Never";
let currentTheme = localStorage.getItem("theme") || "light";

function updateDisplay() {
  counterValueEl.textContent = count;
  counterBgEl.textContent = count;
  timestampEl.textContent = lastUpdated;

  if (count > 0) {
    counterEl.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--success");
  } else if (count < 0) {
    counterEl.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--danger");
  } else {
    counterEl.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--primary");
  }
}

function updateStorage() {
  localStorage.setItem("count", count);
  const now = new Date().toLocaleString();
  lastUpdated = now;
  localStorage.setItem("lastUpdated", now);
}

function createConfetti() {
  const colors = [
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue("--success")
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue("--warning")
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue("--danger")
      .trim(),
  ];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confetti ${
      Math.random() * 3 + 2
    }s ease-out forwards`;
    confetti.style.width = `${Math.random() * 10 + 8}px`;
    confetti.style.height = `${Math.random() * 10 + 8}px`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

incrementBtn.onclick = () => {
  count++;
  updateStorage();
  updateDisplay();
  counterEl.classList.add("bounce");
  setTimeout(() => counterEl.classList.remove("bounce"), 600);

  if (count % 10 === 0 && count !== 0) {
    createConfetti();
    counterEl.classList.add("glow");
    setTimeout(() => counterEl.classList.remove("glow"), 1000);
  }
};

decrementBtn.onclick = () => {
  count--;
  updateStorage();
  updateDisplay();
  counterEl.classList.add("pulse");
  setTimeout(() => counterEl.classList.remove("pulse"), 500);
};

resetBtn.onclick = () => {
  count = 0;
  updateStorage();
  updateDisplay();
  counterEl.classList.add("pulse");
  setTimeout(() => counterEl.classList.remove("pulse"), 500);
};

[incrementBtn, decrementBtn, resetBtn].forEach((btn) => {
  btn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => (this.style.transform = ""), 200);
  });
});

themeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const theme = this.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", theme);
    currentTheme = theme;
    localStorage.setItem("theme", theme);

    themeButtons.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

function init() {
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeButtons.forEach((btn) => {
    if (btn.getAttribute("data-theme") === currentTheme) {
      btn.classList.add("active");
    }
  });

  updateDisplay();
}

init();
