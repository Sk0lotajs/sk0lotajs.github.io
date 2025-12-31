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

document.querySelectorAll('#step-race .card').forEach(card => {
    card.addEventListener('click', () => {
        character.race = card.dataset.race;
        goToStep(1);
    });
});

document.querySelectorAll('#step-class .card').forEach(card => {
    card.addEventListener('click', () => {
        character.class = card.dataset.class;
        generateAndShowStats();
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
    autognome: {'free1': 2, 'free2': 1},
    bugbear: {str: 2, dex: 1},
    vedalken: {int: 2, wis: 1},
    verdan: {cha: 2, con: 1},
    "simic-hybrid": {con: 2, 'free1': 1},
    gith: {int: 1},
    giff: {'free1': 2, 'free2': 1},
    gnome: {int: 2},
    goblin: {dex: 2, con: 1},
    goliath: {str: 2, con: 1},
    grung: {dex: 2, con: 1},
    dwarf: {con: 2},
    genasi: {con: 2},
    dragonborn: {str: 2, cha: 1},
    changeling: {cha: 2, 'free1': 1},
    kalashtar: {wis: 2, cha: 1},
    kender: {'free1': 2, 'free2': 1},
    kenku: {dex: 2, wis: 1},
    centaur: {str: 2, wis: 1},
    kobold: {dex: 2},
    warforged: {con: 2, 'free1': 1},
    leonin: {str: 2, con: 1},
    locathah: {str: 2, dex: 1},
    loxodon: {con: 2, wis: 1},
    lizardfolk: {con: 2, wis: 1},
    minotaur: {str: 2, con: 1},
    naga: {con: 2, int: 1},
    orc: {str: 2, con: 1},
    plasmoid: {'free1': 2, 'free2': 1},
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
    const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    let sum = rolls[0] + rolls[1] + rolls[2];

    if (sum >= 17 && Math.random() < 0.6) sum--;
    if (sum === 18 && Math.random() < 0.7) sum --;

    return sum;
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

    const freeBonuses = getFreeRaceBonuses(character.race);
    const statsContainer = document.getElementById('stats-container');

    if (freeBonuses.length) {
        renderFreeBonusSelection(statsContainer, freeBonuses);
        preventDuplicateSelections(statsContainer);
    }
}

document.getElementById('confirm-stats').addEventListener('click', () => {
    document.querySelectorAll('.selectable select').forEach(select => {
        character.stats[select.value] = Number(select.dataset.value);
    });

    applyFixedRaceBonuses(character.stats, character.race);
    applyFreeRaceBonuses(character.stats, document.getElementById('stats-container'));

    goToStep(3);
    renderClassEquipment();
});

// ASDASSDASD
// aSDASDAD
// ASDASD
// ASDASD
// ASDASDA

function applyFixedRaceBonuses(stats, race) {
    const bonuses = RACE_BONUSES[race];
    if (!bonuses) return stats;

    for (const [key, value] of Object.entries(bonuses)) {
        if (!key.startsWith('free')) {
            stats[key] += value;
        }
    }
}

function getFreeRaceBonuses(race) {
    const bonuses = RACE_BONUSES[race];
    if (!bonuses) return [];

    return Object.entries(bonuses)
        .filter(([key]) => key.startsWith('free'))
        .map(([_, value]) => value);
}

function renderFreeBonusSelection(container, freeBonuses) {
    freeBonuses.forEach((bonus, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'free-bonus';

        wrapper.innerHTML = `
        <h3>Выберите характеристику для бонуса от расы [${index + 1}]:</h3>
            <label>
                +${bonus} к
                <select data-bonus="${bonus}">
                    ${STATS.map(stat =>
                        `<option value="${stat}">${STAT_NAMES[stat]}</option>`
                    ).join('')}
                </select>
            </label>
        `;

        container.appendChild(wrapper);
    });
}

function preventDuplicateSelections(container) {
    const selects = container.querySelectorAll('select');

    selects.forEach(select => {
        select.addEventListener('change', () => {
            const used = Array.from(selects).map(s => s.value);

            selects.forEach(s => {
                Array.from(s.options).forEach(opt => {
                    opt.disabled = used.includes(opt.value) && opt.value !== s.value;
                });
            });
        });
    });
}

function applyFreeRaceBonuses(stats, container) {
    container.querySelectorAll('select').forEach(select => {
        const stat = select.value;
        const bonus = Number(select.dataset.bonus);
        stats[stat] += bonus;
    });
}

const CLASS_LOADOUTS = {
    bard: {
        skills: {
            choose: 3,
            options: ['Атлетика', 'Акробатика', 'Ловкость рук', 'Скрытность', 'Магия', 'История', 'Анализ', 'Природа', 'Религия', 'Уход за животными', 'Проницательность', 'Медицина', 'Внимательность', 'Выживание', 'Обман', 'Запугивание', 'Выступление', 'Убеждение']
        },

        weaponChoice: [
            ['Рапира', 'Длинный меч', {custom: 'Любое простое оружие'}]
        ],

        equipmentChoice: [
            ['Набор дипломата', 'Набор артиста'],
            ['Лютня', {custom: 'Любой другой музыкальный инструмент'}]
        ],

        autoEquipment: [
            'Кожаная броня',
            'Кинжал'
        ]
    }
}

function renderClassEquipment() {
    const container = document.getElementById('equipment-container');
    container.innerHTML = '';

    const loadout = CLASS_LOADOUTS[character.class];
    if (!loadout) return;

    const skillsBlock = document.createElement('div');
    skillsBlock.innerHTML = `<h3>Выберите ${loadout.skills.choose} навыка</h3>`;

    loadout.skills.options.forEach(skill => {
        skillsBlock.innerHTML += `
            <label>
                <input type="checkbox" class="skill-checkbox" value="${skill}">
                ${skill}
            </label><br>
        `;
    });

    container.appendChild(skillsBlock);

    loadout.weaponChoice.forEach((options, i) => {
        const optionsHTML = options.map(o => {
            if (typeof o === 'string') {
                return `<option value="${o}">${o}</option>`;
            } else if (o.custom) {
                return `<option value="custom">${o.custom}</option>`;
            }
        }).join('');
        
        container.innerHTML += `
            <div class = 'weapon-selection-group'>
                <h3>Выберите оружие</h3>
                <select class = "weapon-select">
                    ${optionsHTML}
                </select>
                <input type = "text" class = "custom-weapon-input" placeholder = "Укажите оружие" style = "display: none; margin-top: 10px;">
            </div>
        `;
    });

    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('weapon-select')) {
            const select = event.target;
            const customInput = select.nextElementSibling; 

            if (select.value === 'custom') {
                customInput.style.display = 'block';
                customInput.focus();
            } else {
                customInput.style.display = 'none';
                customInput.value = '';
            }
        }
    });

    loadout.equipmentChoice.forEach((options, i) => {
        const optionsHTML = options.map(o => {
            if (typeof o === 'string') {
                return `<option value="${o}">${o}</option>`;
            } else if (o.custom) {
                return `<option value="custom">${o.custom}</option>`;
            }
        }).join('');

        container.innerHTML += `
            <div class = "equipment-block">
                <h3>Выберите снаряжение</h3>
                <select class = "equipment-select">
                ${optionsHTML}
                </select>
                <input type = "text" class = "custom-equipment-input" placeholder = "Укажите снаряжение" style = "display: none; margin-top: 10px;">
            </div>
        `;
    });

    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('equipment-select')) {
            const select = event.target;
            const customInput = select.nextElementSibling; 

            if (select.value === 'custom') {
                customInput.style.display = 'block';
                customInput.focus();
            } else {
                customInput.style.display = 'none';
                customInput.value = '';
            }
        }
    });

    if (loadout.autoEquipment.length) {
        container.innerHTML += `
            <h3>Вы получаете автоматически</h3>
            <ul>
                ${loadout.autoEquipment.map(i => `<li>${i}</li>`).join('')}
            </ul>
        `;
    }

}

document.addEventListener('change', e => {
    if (!e.target.classList.contains('skill-checkbox')) return;

    const checkboxes = document.querySelectorAll('.skill-checkbox');
    const chosen = [...checkboxes].filter(c => c.checked);

    const max = CLASS_LOADOUTS[character.class].skills.choose;

    if (chosen.length > max) {
        e.target.checked = false;
        alert(`Можно выбрать только ${max} навыка`);
    }
});

document.getElementById('confirm-equipment').addEventListener('click', () => {
    character.skills = [...document.querySelectorAll('.skill-checkbox:checked')]
        .map(c => c.value);

    character.weapons = [...document.querySelectorAll('.weapon-select')]
        .map(s => s.value);

    character.equipment = [
        ...[...document.querySelectorAll('.equipment-select')].map(s => s.value),
        ...CLASS_LOADOUTS[character.class].autoEquipment
    ];

    goToStep(4);
});

const equipment = [];

document.querySelectorAll('.equipment-block').forEach(block => {
    const select = block.querySelector('select');
    const input = block.querySelector('input');

    if (select.value === 'custom') {
        if (!input.value.trim()) {
            alert('Введите название предмета');
            throw new Error('Custom equipment empty');
        }
        equipment.push(input.value.trim());
    } else {
        equipment.push(select.value);
    }
});

equipment.push(...CLASS_LOADOUTS[character.class].autoEquipment);
character.equipment = equipment;