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

const character = {
        race: null,
        class: null,
        stats: {}
};

const steps = document.querySelectorAll('.step');
const progressSteps = document.querySelectorAll('.progress-step');
let currentStep = 0;

function goToStep(index) {
    steps.forEach(s => s.classList.remove('active'));
    progressSteps.forEach(p => p.classList.remove('active'));
    steps[index].classList.add('active');
    progressSteps[index].classList.add('active');
    currentStep = index;
}

document.querySelectorAll('[data-race]').forEach(card => {
    card.addEventListener('click', () => {
        character.race = card.dataset.race;
        goToStep(1);
    });
});

document.querySelectorAll('[data-class]').forEach(card => {
    card.addEventListener('click', () => {
        character.class = card.dataset.class;
        goToStep(2);
    });
});

const STATS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const STAT_NAMES = {
    str: 'Сила',
    dex: 'Ловкость',
    con: 'Телосложение',
    int: 'Интеллект',
    wis: 'Мудрость',
    cha: 'Харизма'
};

const CLASS_PRIORITIES = {
    bard: ['dex', 'cha'],
    barbarian: ['str', 'con'],
    fighter: ['str', 'con'],
    wizard: ['int', 'wis'],
    druid: ['int', 'wis'],
    cleric: ['wis', 'cha'],
    artificer: ['con', 'int'],
    warlock: ['wis', 'cha'],
    monk: ['str', 'dex'],
    paladin: ['wis', 'cha'],
    rogue: ['dex', 'int'],
    ranger: ['str', 'dex'],
    sorcerer: ['con', 'cha']
};

const RACE_BONUSES = {
    aarakocra: {dex: 2, wis: 1},
    aasimar: {cha: 2},
    aven: {dex: 2},
    autognome: {int: 2, con: 1},
    bugbear: {str: 2, dex: 1},
    vedalken: {int: 2, wis: 1},
    verdan: {cha: 2, con: 1},
    "simic-hybrid": {con: 2, int: 1},
    gith: {int: 1},
    giff: {con: 2, str: 1},
    gnome: {int: 2},
    goblin: {dex: 2, con: 1},
    goliath: {str: 2, con: 1},
    grung: {dex: 2, con: 1},
    dwarf: {con: 2},
    genasi: {con: 2},
    dragonborn: {str: 2, cha: 1},
    changeling: {cha: 2, int: 1},
    kalashtar: {wis: 2, cha: 1},
    kender: {dex: 2, cha: 1},
    kenku: {dex: 2, wis: 1},
    centaur: {str: 2, wis: 1},
    kobold: {dex: 2},
    warforged: {con: 2, str: 1},
    leonin: {str: 2, con: 1},
    locathah: {str: 2, dex: 1},
    loxodon: {con: 2, wis: 1},
    lizardfolk: {con: 2, wis: 1},
    minotaur: {str: 2, con: 1},
    naga: {con: 2, int: 1},
    orc: {str: 2, con: 1},
    plasmoid: {con: 2, cha: 1},
    "half-orc": {str: 2, con: 1},
    halfling: {dex: 2},
    "half-elf": {cha: 2, 'free1': 1},
    satyr: {cha: 2, dex: 1},
    owlin: {'free1': 2, 'free2': 1},
    tabaxi: {dex: 2, cha: 1},
    tiefling: {cha: 2, int: 1},
    tortle: {str: 2, wis: 1},
    "thri-kreen": {'free1': 2, 'free2': 1},
    triton: {con: 2, cha: 1},
    firbolg: {wis: 2, str: 1},
    fairy: {'free1': 2, 'free2': 1},
    hadozee: {'free1': 2, 'free2': 1},
    harengon: {'free1': 2, 'free2': 1},
    kherna: {dex: 2, str: 1},
    hobgoblin: {con: 2, int: 1},
    human: {'free1': 1, 'free2': 1},
    shifter: {},
    elf: {dex: 2},
    "yuan-ti": {cha: 2, int: 1}
}

function rollStat() {
    const rolls = Array.from({length: 6}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    return rolls[0] + rolls[1] + rolls[2];
}

function generateStats() {
    return Array.from({length: 6}, rollStat).sort((a, b) => b - a);
}

function generateAndShowStats() {
    const container = document.getElementById('stats-container');
    container.innerHTML = '';

    const values = generateStats();
    const priorities = CLASS_PRIORITIES[character.class];

    const assigned = {
        [priorities[0]]: values.shift(),
        [priorities[1]]: values.shift()
    };

    Object.entries(assigned).forEach(([stat, value], i) => {
        container.innerHTML += `
            <div class="stat-assigned">
                <span>${i + 1}</span>
                <span>${STAT_NAMES[stat]}</span>
                <span>${value}</span>
            </div>
        `;
        character.stats[stat] = value;
    });

    const remainingStats = Object.keys(STAT_NAMES)
        .filter(s => !assigned[s]);

    remainingStats.forEach((stat, i) => {
        container.innerHTML += `
            <div class="stat selectable">
                <span>${i + 3}</span>
                <select data-value="${values[i]}">
                    ${remainingStats.map(s =>
                        `<option value="${s}">${STAT_NAMES[s]}</option>`
                    ).join('')}
                </select>
                <span>${values[i]}</span>
            </div>
        `;
    });
}

document.getElementById('confirm-stats').addEventListener('click', () => {
    document.querySelectorAll('.selectable select').forEach(select => {
        character.stats[select.value] = Number(select.dataset.value);
    });

    goToStep(3);
});