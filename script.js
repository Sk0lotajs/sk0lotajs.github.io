let level = 0;

const questions = [
    {
      title: "Definīcijas kopa",
      content: "Nosaki vienādojuma elementus, kas NEATBILST definīcijas kopai.",
      type: "input",
      q: "\\( \\frac{3}{x-2} \\)",
      answer: "2",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts!"
    },
    {
      title: "Definīcijas kopa",
      content: "Nosaki vienādojuma elementus, kas NEATBILST definīcijas kopai.",
      type: "single",
      q: "\\( \\frac{y+3}{y+5} \\)",
      options: ["-5", "-3", "0", "Nav"],
      answer: "-5",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts!"
    },
    {
      title: "Definīcijas kopa",
      content: "Nosaki vienādojuma elementus, kas NEATBILST definīcijas kopai.",
      q: "\\( \\frac{3}{z^2-4} \\)",
      type: "multiple",
      options: ["-2", "2", "0", "Nav"],
      answer: ["-2", "2"],
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts!"
    },
    {
      title: "Definīcijas kopa",
      content: "Nosaki vienādojuma elementus, kas NEATBILST definīcijas kopai.",
      type: "input",
      q: "\\( \\frac{1}{\\sqrt{t-1}} \\)",
      answer: "1",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts, un ka kvadrātsakne no negatīva skaitļa nav definēta reālajos skaitļos!"
    },
    {
      title: "Definīcijas kopa",
      content: "Nosaki vienādojuma elementus, kas NEATBILST definīcijas kopai.",
      q: "\\( \\frac{1}{5-x} \\)",
      type: "input",
      answer: "5",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts!"
    },
    {
      title: "Definīcijas kopa",
      content: "Nosaki vienādojuma elementus, kas NEATBILST definīcijas kopai.",
      type: "multiple",
      q: "\\( \\frac{1}{y^2-9} \\)",
      options: ["-3", "3", "0", "Nav"],
      answer: ["-3", "3"],
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts!"
    },
    {
      title: "Spriežot par dalījumu",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{2x}{x-1}=4 \\)",
      answer: "2",
      hint: "Sareizini ar saucēju! Reizinot ar kopsaucēju, atceries, ka tas nedrīkst būt nulle!"
    },
    {
      title: "Spriežot par dalījumu",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{3y}{y+2}=2 \\)",
      answer: "4",
      hint: "Sareizini ar saucēju! Reizinot ar kopsaucēju, atceries, ka tas nedrīkst būt nulle!"
    },
    {
      title: "Spriežot par dalījumu",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{5z}{z-1}=4 \\)",
      options: ["-4", "4", "0", "Nav"],
      answer: "-4",
      hint: "Sareizini ar saucēju! Reizinot ar kopsaucēju, atceries, ka tas nedrīkst būt nulle!"
    },
    {
      title: "Spriežot par dalījumu",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{2t}{t-2}=6 \\)",
      options: ["-3", "3", "6", "Nav"],
      answer: "3",
      hint: "Sareizini ar saucēju! Reizinot ar kopsaucēju, atceries, ka tas nedrīkst būt nulle!"
    },
    {
      title: "Spriežot par dalījumu",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{6x}{5-x}=9 \\)",
      answer: "3",
      hint: "Sareizini ar saucēju! Reizinot ar kopsaucēju, atceries, ka tas nedrīkst būt nulle!"
    },
    {
      title: "Ja daļa ir vienāda ar nulli",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{2y}{y^2-4}=0 \\)",
      options: ["-2", "2", "0", "Nav"],
      answer: "0",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts! Tātad, lai daļa būtu vienāda ar nulli, skaitītājam jābūt vienādam ar nulli, bet saucējam jābūt atšķirīgam no nulles!"
    },
    {
      title: "Ja daļa ir vienāda ar nulli",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{3z}{z^2+1}=0 \\)",
      answer: "0",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts! Tātad, lai daļa būtu vienāda ar nulli, skaitītājam jābūt vienādam ar nulli, bet saucējam jābūt atšķirīgam no nulles!"
    },
    {
      title: "Ja daļa ir vienāda ar nulli",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{5t+5}{t-3}=0 \\)",
      options: ["-1", "3", "0", "Nav"],
      answer: "-1",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts! Tātad, lai daļa būtu vienāda ar nulli, skaitītājam jābūt vienādam ar nulli, bet saucējam jābūt atšķirīgam no nulles!"
    },
    {
      title: "Ja daļa ir vienāda ar nulli",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{4x-4}{x-1}=0 \\)",
      options: ["-1", "1", "0", "Nav"],
      answer: "Nav",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts! Tātad, lai daļa būtu vienāda ar nulli, skaitītājam jābūt vienādam ar nulli, bet saucējam jābūt atšķirīgam no nulles!"
    },
    {
      title: "Ja daļa ir vienāda ar nulli",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{6y+6}{y+2}=0 \\)",
      answer: "-1",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts! Tātad, lai daļa būtu vienāda ar nulli, skaitītājam jābūt vienādam ar nulli, bet saucējam jābūt atšķirīgam no nulles!"
    },
    {
      title: "Ja daļa ir vienāda ar nulli",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{8z-8}{z^2-1}=0 \\)",
      options: ["-1", "1", "0", "Nav"],
      answer: "Nav",
      hint: "Atceries, ka dalījums (visa izteiksme) ar nulli nav definēts! Tātad, lai daļa būtu vienāda ar nulli, skaitītājam jābūt vienādam ar nulli, bet saucējam jābūt atšķirīgam no nulles!"
    },
    {
      title: "Proporcija",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{2x}{3} = \\frac{4}{6} \\)",
      answer: "1",
      hint: "Atceries, ka proporcijas vienādojumu var atrisināt, reizinot krustām!"
    },
    {
      title: "Proporcija",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{5y}{2} = \\frac{10}{4} \\)",
      answer: "1",
      hint: "Atceries, ka proporcijas vienādojumu var atrisināt, reizinot krustām!"
    },
    {
      title: "Proporcija",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{z}{4} = \\frac{9}{12} \\)",
      options: ["-3", "3", "0", "Nav"],
      answer: "3",
      hint: "Atceries, ka proporcijas vienādojumu var atrisināt, reizinot krustām!"
    },
    {
      title: "Proporcija",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "single",
      q: "\\( \\frac{t}{5} = \\frac{6}{10} \\)",
      options: ["-3", "3", "0", "Nav"],
      answer: "3",
      hint: "Atceries, ka proporcijas vienādojumu var atrisināt, reizinot krustām!"
    },
    {
      title: "Proporcija",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{3x}{7} = \\frac{6}{14} \\)",
      answer: "1",
      hint: "Atceries, ka proporcijas vienādojumu var atrisināt, reizinot krustām!"
    },
    {
      title: "Proporcija",
      content: "Nosaki vienādojuma saknes, spriežot par dalījumu.",
      type: "input",
      q: "\\( \\frac{4y}{9} = \\frac{8}{18} \\)",
      answer: "1",
      hint: "Atceries, ka proporcijas vienādojumu var atrisināt, reizinot krustām!"
    },
    {
      title: "Pārveidojumi",
      content: "Kur ir kļūda, pārveidojot vienādojumu?",
      type: "single",
      q: `
      \\( \\frac{1}{x} + \\frac{1}{x-2} = 2 \\)<br><br>
      Reizinām ar x un iegūstam:<br>
      \\( 1 + \\frac{x}{x-2} = 2x \\)
      `,
      options: ["Nav izmantots kopsaucējs x(x-2)", "Nekorekti pārveidota pirmā daļa", "Nekorekti pārveidota otrā daļa", "Kļūdu nav"],
      answer: "Nav izmantots kopsaucējs x(x-2)",
      hint: "Atceries, ka, lai pareizi pārveidotu vienādojumu, ir jāreizinās ar kopsaucēju, kas šajā gadījumā ir x(x-2)!"
    },
    {
      title: "Pārveidojumi",
      content: "Kur ir kļūda, pārveidojot vienādojumu?",
      type: "single",
      q: `
      \\( \\frac{2}{y} - \\frac{3}{y+1} = 1 \\)<br><br>
      Reizinām ar y(y+1) un iegūstam:<br>
      \\( 2 - 3y = y(y+1) \\)
      `,
      options: ["Nav izmantots kopsaucējs y(y+1)", "Nekorekti pārveidota pirmā daļa", "Nekorekti pārveidota otrā daļa", "Kļūdu nav"],
      answer: "Nekorekti pārveidota pirmā daļa",
      hint: "Atceries, ka, lai pareizi pārveidotu vienādojumu, ir jāreizinās ar kopsaucēju, kas šajā gadījumā ir y(y+1)!"
    },
    {
      title: "Pārveidojumi",
      content: "Uzraksti ? vietā atbilstošo vērtību, pārveidojot vienādojumu.",
      type: "input",
      q: `
      \\( \\frac{3}{z} + \\frac{4}{z-1} = 5 \\)<br><br>
      Reizinām ar z(z-1) un iegūstam:<br>
      \\( 3(z-1) + ? = 5z(z-1) \\)`,
      answer: "4z",
      hint: "Atceries, ka, lai pareizi pārveidotu vienādojumu, ir jāreizinās ar kopsaucēju, kas šajā gadījumā ir z(z-1)!"
    },
    {
      title: "Pārveidojumi",
      content: "Uzraksti ? vietā atbilstošo vērtību, pārveidojot vienādojumu.",
      type: "input",
      q: `
      \\( \\frac{5}{t} - \\frac{2}{t+3} = 3 \\)<br><br>
      Reizinām ar t(t+3) un iegūstam:<br>
      \\( 5(t+3) - ? = 3t(t+3) \\)`,
      answer: "2t",
      hint: "Atceries, ka, lai pareizi pārveidotu vienādojumu, ir jāreizinās ar kopsaucēju, kas šajā gadījumā ir t(t+3)!"
    },
    {
      title: "Algoritms",
      content: "Sakārto algoritma secību, lai atrisinātu šo vienādojumu",
      type: "DragAndDrop",
      q: "\\( \\frac{2}{x} + \\frac{3}{x-1} = 5 \\)",
      options: ["Reizināt ar kopsaucēju x(x-1)", "Noteikt definīcijas kopu", "Atrisināt iegūto vienādojumu", "Pārbaudīt iegūto sakni", "Pārvietot visas daļas vienā pusē"],
      answer: ["Noteikt definīcijas kopu", "Reizināt ar kopsaucēju x(x-1)", "Pārvietot visas daļas vienā pusē", "Atrisināt iegūto vienādojumu", "Pārbaudīt iegūto sakni"],
      hint: "Atceries, ka, lai pareizi pārveidotu vienādojumu, ir jāreizinās ar kopsaucēju, kas šajā gadījumā ir x(x-1)! Un neaizmirsti pārbaudīt iegūto sakni, jo dalījuma vienādojumiem var būt nevēlamas saknes!"
    },
    {
      title: "Algoritms",
      content: "Sakārto algoritma secību, lai atrisinātu šo vienādojumu",
      type: "DragAndDrop",
      q: "\\( \\frac{4}{y} - \\frac{5}{y+2} = 3 \\)",
      options: ["Reizināt ar kopsaucēju y(y+2)", "Noteikt definīcijas kopu", "Atrisināt iegūto vienādojumu", "Pārbaudīt iegūto sakni", "Pārvietot visas daļas vienā pusē"],
      answer: ["Noteikt definīcijas kopu", "Reizināt ar kopsaucēju y(y+2)", "Pārvietot visas daļas vienā pusē", "Atrisināt iegūto vienādojumu", "Pārbaudīt iegūto sakni"],
      hint: "Atceries, ka, lai pareizi pārveidotu vienādojumu, ir jāreizinās ar kopsaucēju, kas šajā gadījumā ir y(y+2)! Un neaizmirsti pārbaudīt iegūto sakni, jo dalījuma vienādojumiem var būt nevēlamas saknes!"
    },
    {
      title: "Papilduzdevums",
      content: "Nosaki šī vienādojuma kopsaucēju",
      type: "input",
      q: "\\( \\frac{1}{x} + \\frac{1}{x-2} \\)",
      answer: "x(x-2)",
      hint: "Atceries, ka kopsaucējs ir saucēju reizinājums!"
    },
    {
      title: "Papilduzdevums",
      content: "Kuru metodi izvēlēties?",
      type: "single",
      q: "\\( \\frac{2}{y} - \\frac{3}{y+1} = 1 \\)",
      options: ["Pārveidojumi", "Proporcija", "Spriežot par dalījumu"],
      answer: "Pārveidojumi",
      hint: "Atceries, ka, lai atrisinātu vienādojumu, kurā ir vairāki dalījumi, vispirms ir jāreizinās ar kopsaucēju, lai atbrīvotos no dalījumiem!"
    },
    {
      title: "Papilduzdevums",
      content: "Kuru metodi izvēlēties?",
      type: "single",
      q: "\\( \\frac{3}{z} = \\frac{6}{12} \\)",
      options: ["Pārveidojumi", "Proporcija", "Spriežot par dalījumu"],
      answer: "Proporcija",
      hint: "Šīs vienādojums attēlo attiecību viens starp otru!"
    }
];

function question() {
  const q = questions[questionCount];
  const container = document.getElementById("questionBox");

  document.getElementById("feedback").innerHTML = "";
  container.innerHTML = "";
  const qTitle = document.createElement("h2");
  qTitle.innerHTML = q.title;
  container.appendChild(qTitle);
  const qContent = document.createElement("p");
  qContent.innerHTML = q.content;
  container.appendChild(qContent);
  const qEquation = document.createElement("p");
  qEquation.innerHTML = q.q;
  container.appendChild(qEquation);

  if (q.type === "input") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "answerInput";
    container.appendChild(input);
  } else if (q.type === "single") {
    q.options.forEach((option, index) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = option;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });
  } else if (q.type === "multiple") {
    q.options.forEach((option, index) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "answer";
      checkbox.value = option;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(option));
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });
  } else if (q.type === "DragAndDrop") {
    const list = document.createElement("ul");
    list.id = "draggableList";

    q.options.forEach(option => {
      const item = document.createElement("li");
      item.draggable = true;
      item.innerText = option;

      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", drop);

      // MOBILAIS
      item.addEventListener("touchstart", touchStart);
      item.addEventListener("touchmove", touchMove);
      item.addEventListener("touchend", touchEnd);

      list.appendChild(item);
    });

    container.appendChild(list);
  }
  
  MathJax.typeset();
}

const easyQuestions = [ /* vieglie */ ];
const mediumQuestions = [ /* vidējie */ ];
const hardQuestions = [ /* grūtie */ ];

let questionCount = 0;

let draggedItem = null;
let touchItem = null;

function dragStart(e) {
  draggedItem = this;
}

function dragOver(e) {
  e.preventDefault(); // ĻOTI svarīgi
}

function drop(e) {
  e.preventDefault();

  if (draggedItem !== this) {
    let list = this.parentNode;
    let nodes = Array.from(list.children);

    let draggedIndex = nodes.indexOf(draggedItem);
    let targetIndex = nodes.indexOf(this);

    if (draggedIndex < targetIndex) {
      list.insertBefore(draggedItem, this.nextSibling);
    } else {
      list.insertBefore(draggedItem, this);
    }
  }
}

function touchStart(e) {
  touchItem = this;
  this.style.opacity = "0.5";
}

function touchMove(e) {
  e.preventDefault();

  const touch = e.touches[0];
  const element = document.elementFromPoint(touch.clientX, touch.clientY);

  if (element && element.tagName === "LI" && element !== touchItem) {
    const list = element.parentNode;
    list.insertBefore(touchItem, element);
  }
}

function touchEnd() {
  this.style.opacity = "1";
  touchItem = null;
}

let kluduSkaits = 0;

function checkAnswer() {
  const q = questions[questionCount];
  const fb = document.getElementById("feedback");
  let isCorrect = false;
  let userAnswer;

  if (q.type === "input") {
    userAnswer = document.getElementById("answerInput").value;
    isCorrect = (userAnswer === q.answer);
  } else if (q.type === "single") {
    const selected = document.querySelector("input[name='answer']:checked");
    userAnswer = selected ? selected.value : null;
    isCorrect = (userAnswer === q.answer);
  } else if (q.type === "multiple") {
    const selected = document.querySelectorAll("input[name='answer']:checked");
    userAnswer = Array.from(selected).map(el => el.value);
    sortedUser = userAnswer.sort();
    sortedCorrect = [...q.answer].sort();
    isCorrect = (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect));
  } else if (q.type === "DragAndDrop") {
    const items = document.querySelectorAll("#draggableList li");
    const userOrder = Array.from(items).map(item => item.innerText);
    isCorrect = (JSON.stringify(userOrder) === JSON.stringify(q.answer));
  }

  // Check if the answer is correct
  if (isCorrect) {
    fb.innerHTML = "✅ Pareizi!";
    kluduSkaits = 0;
    score++;
    updateScore();
    questionCount++;
    if (questionCount >= questions.length) {
      endGame();
      clearInterval(timerInterval);
      return;
    }
    setTimeout(question, 1000);
  } else {
    kluduSkaits++;
    if (kluduSkaits >= 3) {
      const explanation = q.hint ? `<br><small>Palīgs: ${q.hint}</small>` : "";
      fb.innerHTML = `<span style='color: red;'>❌ Nepareizi!</span> ${explanation}`;
    } else {
      fb.innerHTML = "<span style='color: red;'>❌ Nepareizi!</span>";
    }
  }
}

let timeLeft = 300; // 5 min = 300 sek
let timerInterval;

function startGame() {
  document.getElementById("menu").remove();
  timeLeft = 300;
  score = 0;
  updateScore();
  shuffleArray(questions);

  timerInterval = setInterval(updateTimer, 1000);

  question();
}

function updateTimer() {
  const timerEl = document.getElementById("timer");

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  // formāts 05:09
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerEl.innerText = `Laiks: ${minutes}:${seconds}`;

  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timerInterval);
    endGame();
  }
}

function endGame() {
  const box = document.getElementById("questionBox");
  const fb = document.getElementById("feedback");
  fb.innerHTML = "Pārbaude pabeigta.";
  box.innerHTML = `🏆 Tu atrisināji pareizi: ${score} uzdevumus!`;
}

let score = 0;

function updateScore() {
  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    scoreEl.innerText = "Pareizi: " + score;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}