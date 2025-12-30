let racesData = {};

fetch('./data/races.json')
    .then(response => response.json())
    .then(data => {
        racesData = data;
    })
    .catch(err => console.error('Ошибка загрузки JSON:', err));

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const raceId = btn.dataset.race;
        const race = racesData[raceId];

        if (!race) return;

        modalTitle.textContent = race.name;
        modalText.textContent = race.description;

        modal.classList.add('active');
    });
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

function closeModal() {
    modal.classList.remove('active');
}