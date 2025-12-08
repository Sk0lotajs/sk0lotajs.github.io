const btn = document.getElementById("go");
const atb = document.getElementById("atbilde");
const name = document.getElementById("name");
const question = document.getElementById("jautajums");
const border = document.getElementById("question");

btn.addEventListener("click", () => {
    let atbilde = atb.value;
    let vards = name.value;
    let jautajums = question.textContent;
    sendData(atbilde, vards, jautajums);
    border.textContent = "Paldies par iesniegto atbildi, " + vards + "!";
});
    
async function sendData(atbilde, vards, jautajums) {

    const url = "https://script.google.com/macros/s/AKfycbwbZFDwJQljfZ9MnWjujh3M3mhEqp9CSC1PBmi4Tq2oLkgo0uP5KeJ_CvpF4pqUwW9F/exec";

    const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            jautajums: jautajums,
            vards: vards,
            atbilde: atbilde
        })
});
}