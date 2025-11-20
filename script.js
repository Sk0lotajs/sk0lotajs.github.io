const loginContainer = document.getElementById("login-container");
const calendarContainer = document.getElementById("calendar-container");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const studentSelect = document.getElementById("student-select");
const studentName = document.getElementById("student-name");
const calendar = document.getElementById("calendar");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const questionTitle = document.getElementById("question-title");
const questionContainer = document.getElementById("question-container");
const submitBtn = document.getElementById("submit-answer");
const feedback = document.getElementById("feedback");

let currentDay = null;
let currentStudent = null;

// --- Авторизация ---
const savedStudent = localStorage.getItem("student");
if (savedStudent) showCalendar(savedStudent);

loginBtn.addEventListener("click", () => {
  const name = studentSelect.value;
  if (!name) return alert("Выберите имя!");
  localStorage.setItem("student", name);
  showCalendar(name);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("student");
  loginContainer.classList.remove("hidden");
  calendarContainer.classList.add("hidden");
});

// --- Показ календаря ---
function showCalendar(name) {
  currentStudent = name;
  loginContainer.classList.add("hidden");
  calendarContainer.classList.remove("hidden");
  studentName.textContent = `Привет, ${name}!`;

  calendar.innerHTML = "";
  const totalDays = 24;
  const today = new Date().getDate(); // можно поменять на 24 для теста
  const studentData = JSON.parse(localStorage.getItem(`answers_${name}`)) || {};

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");
    cell.textContent = day;

    if (studentData[day]) cell.classList.add("opened");

    // Разрешаем клик по доступным дням
    if (day <= today) {
      cell.addEventListener("click", () => openQuestion(day, cell));
    } else {
      cell.style.opacity = "0.5";
      cell.style.cursor = "not-allowed";
    }

    calendar.appendChild(cell);
  }
}

// --- Открытие вопросов ---
function openQuestion(day, element) {
  currentDay = day;
  questionContainer.innerHTML = "";
  feedback.textContent = "";

  const qList = questions[day];

  // если для дня нет вопросов → просто подарок
  if (!qList) {
    element.classList.add("opened");
    saveAnswer(currentStudent, day, { info: "Без вопросов" });
    alert(`🎁 День ${day}: сегодня просто подарок!`);
    return;
  }

  // формируем модальное окно
  questionTitle.textContent = `День ${day}`;
  qList.forEach((q, index) => {
    const block = document.createElement("div");
    block.classList.add("question-block");
    const label = document.createElement("p");
    label.textContent = q.question;
    block.appendChild(label);

    if (q.type === "text") {
      const input = document.createElement("textarea");
      input.id = `answer_${index}`;
      input.placeholder = "Ваш ответ...";
      input.rows = 2;
      block.appendChild(input);
    } else if (q.type === "choice") {
      q.options.forEach((opt) => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="radio" name="answer_${index}" value="${opt}"> ${opt}`;
        block.appendChild(lbl);
        block.appendChild(document.createElement("br"));
      });
    }

    questionContainer.appendChild(block);
  });

  // показать окно
  modal.classList.remove("hidden");
}

// --- Отправка ответов ---
submitBtn.addEventListener("click", () => {
  if (!currentDay || !currentStudent) return;

  const qList = questions[currentDay];
  const answers = {};

  qList.forEach((q, index) => {
    if (q.type === "text") {
      answers[q.question] =
        document.getElementById(`answer_${index}`).value.trim();
    } else if (q.type === "choice") {
      const selected = document.querySelector(
        `input[name="answer_${index}"]:checked`
      );
      answers[q.question] = selected ? selected.value : "";
    }
  });

  saveAnswer(currentStudent, currentDay, answers);

  sendToGoogleSheet(currentStudent, currentDay, answers);

  feedback.textContent = "✅ Спасибо! Подарок разблокирован 🎁";
  feedback.style.color = "green";

  // отмечаем день открытым
  const currentCell = Array.from(document.querySelectorAll(".day")).find(
    (d) => d.textContent == currentDay
  );
  if (currentCell) currentCell.classList.add("opened");

  // закрываем окно через 1.2с
  setTimeout(() => {
    modal.classList.add("hidden");
    questionContainer.innerHTML = "";
    feedback.textContent = "";
  }, 1200);
});

// --- Закрытие модалки ---
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  questionContainer.innerHTML = "";
  feedback.textContent = "";
});

// --- Сохранение ответов ---
function saveAnswer(student, day, answers) {
  const key = `answers_${student}`;
  const data = JSON.parse(localStorage.getItem(key)) || {};
  data[day] = answers;
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Отправка данных в Google Sheets ---
function sendToGoogleSheet(student, day, answers) {
  const url = "https://script.google.com/macros/s/AKfycbxmMmOsXi9pcScNoFSUbDgmIy92GDHZO5sl_XpnjOYvdeZo4x_P7-gKYS50vh26zVJ8/exec";

  // Преобразуем объект ответов в массив
  const answersArray = Object.entries(answers).map(([question, answer]) => ({
    question,
    answer
  }));

  const payload = {
    student,
    day,
    answers: answersArray
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors", // важно, чтобы браузер не блокировал запрос
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(() => console.log("Ответы успешно отправлены в Google Sheet"))
  .catch(err => console.error("Ошибка при отправке:", err));
}
