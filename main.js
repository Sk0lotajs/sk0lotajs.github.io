import { showCalendar } from "./calendar.js";
import { initUI } from "./ui.js";
import { initGifts } from "./gifts.js";

console.log(document.getElementById("login-btn"));

document.addEventListener("DOMContentLoaded", () => {

let currentStudent = null;

// элементы
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const studentSelect = document.getElementById("student-select");

const savedStudent = localStorage.getItem("student");
if (savedStudent) {
  currentStudent = savedStudent;
  showCalendar(savedStudent);
  initUI(savedStudent);
  initGifts(savedStudent);
}

loginBtn.addEventListener("click", () => {
  const name = studentSelect.value;
  if (!name) return alert("Izvēlies vārdu!");

  localStorage.setItem("student", name);
  currentStudent = name;

  showCalendar(name);
  initUI(name);
  initGifts(name);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("student");
  location.reload();
});

});