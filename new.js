const character = { // ДАННЫЕ ПЕРСОНАЖА
    name: "",
    race: null,
    class: null,
    stats: {},
    equipments: {},
    skills: {},
    weapons: {},
    spells: {}
}

const allStatKey = [ // НАЗВАНИЕ ПЕРЕМЕННЫХ ХАРАКТЕРИСТИК
    'str',
    'dex',
    'con',
    'int',
    'wis',
    'cha'
]

const STAT_NAMES = { // НОРМАЛЬНОЕ НАЗВАНИЕ ХАРАКТЕРИСТИК
    str: 'Сила',
    dex: 'Ловкость',
    con: 'Телосложение',
    int: 'Интеллект',
    wis: 'Мудрость',
    cha: 'Харизма'
}

let [races, classes, racebonus, spells, priorities, loadouts, additional, additionalclass] = [,,,,,,,];

async function loadData() { // БАЗА ДАННЫХ СО ВСЕЙ ИНФОРМАЦИЕЙ (РАСА, КЛАССЫ, БОНУСЫ, ЗАКЛИНАНИЯ, ПРИОРИТЕТЫ И ЭКИПИРОВКА)
    [races, classes, racebonus, spells, priorities, loadouts, additional, additionalclass] = await Promise.all(
        ["races", "classes", "racebonus", "spells", "priorities", "loadouts", "additional", "additionalclass"].map(f => fetch(`./data/${f}.json`).then(r => r.json()))
    );
    renderRaceCards();
    setupEventListeners();
}

loadData();

function renderRaceCards() { // ВОССОЗДАНИЕ DIVОВ для РАСЫ (jeb КАРТОЧЕК)
    document.getElementById('instruction').innerHTML = '<h3>Выберите расу для своего персонажа:</h3>';
    document.querySelector('.races-container').innerHTML = Object.entries(races).map(([id, race]) => `
            <div class = "card" id = "${id}">
                <div class = "info-btn" data-race = "${id}">!</div>
                <div class = "card-info">
                    <h3>${race.name}</h3>
                    <span class = "eng">${id}</span>
                </div>
                <div class = "card-image">
                    <img src = "./images/races/race-${id}.webp" loading = "lazy">
                </div>
            </div>`).join('');
}

function renderClassCards() { // ВОССОЗДАНИЕ DIVОВ для КЛАССОВ (jeb КАРТОЧЕК)
    document.getElementById('instruction').innerHTML = '<h3>Выберите класс для своего персонажа:</h3>';
    document.querySelector('.classes-container').innerHTML = Object.entries(classes).map(([id, cls]) => `
        <div class = "card" id = "${id}">
            <div class  ="info-btn" data-class = "${id}">!</div>
            <div class = "card-info">
                <h3>${cls.name}</h3>
                <span class = "eng">${id}</span>
            </div>
            <div class = "card-class-image">
                <img src = "./images/classes/class-${id}.webp" loading = "lazy">
            </div>
        </div>`).join('');
}

function renderManualStatSelection(values, statNames, prioritiesList) { // ВОССОЗДАНИЕ DIVОВ ДЛЯ ВЫБОРА ПРИОРИТЕТА ХАРАКТЕРИСТИК
    document.querySelector('.character-creation').innerHTML = `<div class = "stats-manual-selection"></div>`
    const container = document.querySelector('.stats-manual-selection');
    let html = `
        <div class = "stats-header">
            <h3>Классовые приоритеты (уже назначены):</h3>
            <p>1-е место: <b>${STAT_NAMES[prioritiesList[0]]}</b></p>
            <p>2-е место: <b>${STAT_NAMES[prioritiesList[1]]}</b></p>
        </div>
        <h3>Распределите остальные значения:</h3>`;
    const rowsHtml = values.map((value, index) => {
        const options = statNames.map(s => {
            const fullName = STAT_NAMES[s];
            return `<option value = "${s}">${fullName}</option>`
        });
        return `
            <div class = "stat-assign-row" style = "margin-bottom: 10px;">
                <span>${index + 3}-е место</span>
                <select class = "manual-stat-select" data-value = "${value}">
                    <option value = "" selected disabled>Выберите характеристику...</option>
                    ${options}
                </select>
            </div>
        `;
    }).join('');
    container.innerHTML = html + rowsHtml + '<button onclick = "checkCompletion()">Подтвердить</button>';
    const selects = container.querySelectorAll('.manual-stat-select');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            const selectedStat = e.target.value;
            const val = parseInt(e.target.dataset.value);
            character.stats[selectedStat] = val;
            updateSelectOptions(selects);
        });
    });
}

function renderFreeBonusSelection(bonuses, freeKeys) { // ЕСЛП ЕСТЬ НЕОПРЕДЕЛЕННЫЕ БОНУСЫ ОТ РАСЫ
    document.querySelector('.character-creation').innerHTML = `
        <div class = "free-bonus-selection">
        </div>`
    const container = document.querySelector('.free-bonus-selection');
    container.innerHTML = `
        <h3>Ваша раса позволяет выбрать дополнительные бонусы:</h3>
        ${freeKeys.map(key => `
            <div class="free-row">
                <span>Бонус +${bonuses[key]}:</span>
                <select class="free-stat-select" data-bonus="${bonuses[key]}">
                    <option value="" disabled selected>Выберите характеристику</option>
                    ${Object.entries(STAT_NAMES).map(([id, name]) => `
                        <option value="${id}">${name}</option>
                    `).join('')}
                </select>
            </div>
        `).join('')}
        <button id="confirm-bonuses" style="margin-top: 15px;">Применить бонусы</button>
    `;

    const selects = document.querySelector('.free-bonus-selection').querySelectorAll('.free-stat-select');

    const updateAvailability = () => {
        const selectedValues = Array.from(selects).map(s => s.value).filter(v => v !== "");
        selects.forEach(currentSelect => {
            const options = currentSelect.querySelectorAll('option');
            options.forEach(opt => {
                if (opt.value === "") return; // Пропускаем плейсхолдер
                const isChosenElsewhere = selectedValues.includes(opt.value) && opt.value !== currentSelect.value;
                opt.disabled = isChosenElsewhere;
            });
        });
    };
    selects.forEach(select => {
        select.addEventListener('change', updateAvailability);
    });
    document.getElementById('confirm-bonuses').onclick = () => {
        const selects = document.querySelectorAll('.free-stat-select');
        let allSelected = true;

        selects.forEach(select => {
            if (!select.value) {
                allSelected = false;
                select.style.border = "1px solid red";
            } else {
                character.stats[select.value] += parseInt(select.dataset.bonus);
            }
        });

        if (allSelected) {
            container.remove(); // Убираем меню выбора
            startLoadoutPhase();    // Показываем итоговый результат
        } else {
            alert("Пожалуйста, распределите все доступные бонусы!");
        }
    };
}

function renderSkills(skillsData) {
    const container = document.querySelector('.loadout-container');
    const html = `
        <div class="loadout-block">
            <h3>Выберите навыки: ${skillsData.choose}</h3>
            <div class="skills-grid">
                ${skillsData.options.map(skill => `
                    <label>
                        <input type="checkbox" name="skill" value="${skill}" onchange="checkSkillLimit(this, ${skillsData.choose})">
                        ${skill}
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderChoices(choiceArray, characterField, title) {
    const container = document.querySelector('.loadout-container');
    let html = `<div class="loadout-block"><h3>${title}:</h3>`;

    choiceArray.forEach((group, groupIndex) => {
        html += `<div class="choice-group" data-field="${characterField}" data-group="${groupIndex}">`;
        
        group.forEach((item, itemIndex) => {
            const isCustom = typeof item === 'object' && item.custom;
            const label = isCustom ? item.custom : item;
            
            // Мы убрали сложные аргументы из onchange, передаем только 'this'
            html += `
                <div class="option-row">
                    <label>
                        <input type="radio" 
                               name="${characterField}-${groupIndex}" 
                               value="${label}" 
                               data-is-custom="${!!isCustom}"
                               onchange="handleChoiceSelection(this)">
                        ${label}
                    </label>
                    ${isCustom ? `<input type="text" class="custom-input hidden" placeholder="Напишите название...">` : ''}
                </div>
            `;
        });
        html += `</div>`;
    });

    container.insertAdjacentHTML('beforeend', html);
}

function renderSpellsPhase() {
    document.querySelector('.character-creation').innerHTML = `
        <div class = "spells-container">
        </div>`
    const classSpells = spells[character.class];
    const container = document.querySelector('.spells-container');
    if (!classSpells || (classSpells.choose0 === 0 && classSpells.choose1 === 0)) {
        return;
    }
    let html = `<h2>Магия и заклинания</h2>`;
    if (classSpells.choose0 > 0) {
        html += renderSpellBlock(0, classSpells.choose0, classSpells.spells0);
    }
    if (classSpells.choose1 > 0) {
        html += renderSpellBlock(1, classSpells.choose1, classSpells.spells1);
    }
    container.innerHTML = html + '<button onclick = "renderNamePhase()">Прожолжить</button>';
}

function renderSpellBlock(level, limit, options) {
    const title = level === 0 ? "Заговоры" : "Заклинания 1-го круга";
    return `
        <div class="spell-tier" style="margin-bottom: 25px;">
            <div class="spell-info-header">
                <h3>${title}</h3>
                <span class="limit-badge">Выберите: ${limit}</span>
            </div>
            <div class="spells-grid">
                ${options.map(spell => `
                    <label class="spell-card">
                        <input type="checkbox" 
                               name="spell-lvl-${level}" 
                               value="${spell}" 
                               onchange="checkSpellLimit(this, ${limit}, ${level})">
                        <span class="spell-name">${spell}</span>
                    </label>
                `).join('')}
            </div>
        </div>`;
}

function renderNamePhase() {
    document.querySelector('.character-creation').innerHTML = '<div class = "name-container"></div>';
    const container = document.querySelector('.name-container');
    if (!container) return;
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="name-selection">
            <h2>Дайте герою имя</h2>
            <p>Как мир будет называть вашего персонажа?</p>
            <div class="input-group">
                <input type="text" id="char-name-input" placeholder="Введите имя..." maxlength="30">
                <button id="save-character-btn" class="btn-main">Готово</button>
            </div>
        </div>
    `;
    const input = document.getElementById('char-name-input');
    const btn = document.getElementById('save-character-btn');
    btn.onclick = () => {
        const nameValue = input.value.trim();
        if (nameValue.length < 2) {
            alert("Имя слишком короткое!");
            return;
        }
        character.name = nameValue;
        console.log("Персонаж полностью готов:", character);
        renderFinalPassport(); 
    };
    input.onkeydown = (e) => {
        if (e.key === 'Enter') btn.click();
    };
}

function renderFinalPassport() {
    document.querySelector('.character-creation').innerHTML = `<div class = "final-passport-container"></div>`
    const container = document.querySelector('.final-passport-container');
    const getMod = (val) => Math.floor((val - 10) / 2);
    container.innerHTML = `
        <div class="passport-card">
            <header class="passport-header">
                <div class="char-main-info">
                    <h1>${character.name}</h1>
                    <p>${races[character.race].name} • ${classes[character.class].name}</p>
                </div>
            </header>
            <div class="passport-body">
                <section class="stats-grid-final">
                    ${Object.entries(character.stats).map(([id, val]) => `
                        <div class="stat-box">
                            <span class="stat-label">${STAT_NAMES[id]}</span>
                            <span class="stat-value">${val}</span>
                            <span class="stat-mod">${getMod(val) >= 0 ? '+' : ''}${getMod(val)}</span>
                        </div>
                    `).join('')}
                </section>
                <div class="details-grid">
                    <section class="details-block">
                        <h3>Навыки</h3>
                        <ul>${character.skills.map(s => `<li>${s}</li>`).join('')}</ul>
                    </section>
                    <section class="details-block">
                        <h3>Экипировка и оружие</h3>
                        <ul>
                            ${character.weapons.map(w => `<li>⚔️ ${w}</li>`).join('')}
                            ${character.equipments.map(e => `<li>📦 ${e}</li>`).join('')}
                        </ul>
                    </section>
                    ${character.spells && (character.spells.level0.length || character.spells.level1.length) ? `
                        <section class="details-block">
                            <h3>Книга заклинаний</h3>
                            <small>Заговоры:</small>
                            <p>${character.spells.level0.join(', ')}</p>
                            <small>1-й уровень заклинаний:</small>
                            <p>${character.spells.level1.join(', ')}</p>
                        </section>
                    ` : ''}
                    <section class = "details-block">
                        <h3>Дополнительные сведения</h3>
                        <small>Языки:</small>
                        <p>${additional[character.race].language.join(', ')}</p>
                        <small>Ячеек заклинаний:</small>
                        <p>${additionalclass[character.class]}</p>
                        <small>Скорость:</small><p>${additional[character.race].speed} фт.</p>
                    </section>
                </div>
            </div>
            <button class="btn-print" onclick="window.print()">Распечатать лист</button>
        </div>
    `;
}

function checkSpellLimit(el, limit, level) {
    const name = `spell-lvl-${level}`;
    const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
    if (checked.length > limit) {
        el.checked = false;
        alert(`Вы уже выбрали максимум заклинаний этого уровня (${limit})`);
    } else {
        if (!character.spells) character.spells = { level0: [], level1: [] };
        const key = `level${level}`;
        character.spells[key] = Array.from(checked).map(i => i.value);
        console.log(`Обновлен список заклинаний ${level} уровня:`, character.spells[key]);
    }
}

function checkSkillLimit(el, limit) {
    const checked = document.querySelectorAll('input[name="skill"]:checked');
    if (checked.length > limit) {
        el.checked = false;
        alert(`Вы можете выбрать не более ${limit} навыков`);
    } else {
        character.skills = Array.from(checked).map(i => i.value);
    }
}

function updateStats() {
    document.getElementById('instruction').remove();
    const rolledValues = Array.from({length: 6}, () => rollStat());
    rolledValues.sort((a, b) => b - a);
    const classPriorities = priorities[character.class];
    classPriorities.forEach((statKey, index) => {
        character.stats[statKey] = rolledValues[index];        
    });
    const remainingValues = rolledValues.slice(2);
    const availableStats = allStatKey.filter(s => !classPriorities.includes(s));
    renderManualStatSelection(remainingValues, availableStats, classPriorities);
}

function setupEventListeners() {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');

    // Универсальный обработчик кликов в контейнерах
    const handleInfoClick = (e) => {
        const btn = e.target.closest('.info-btn');
        if (!btn) return;

        e.stopPropagation(); // Чтобы не сработал выбор карточки

        let data = null;
        // Проверяем, чью инфу запросили
        if (btn.dataset.race) {
            data = races[btn.dataset.race];
        } else if (btn.dataset.class) {
            data = classes[btn.dataset.class];
        }

        if (data) {
            showModal(data);
        }
    };

    function showModal(info) {
        modalBody.innerHTML = `
            <h2>${info.name}</h2>
            <hr>
            <div class="info-text">
                ${info.description || "Информация временно отсутствует."}
            </div>
            ${info.features ? `<h3>Особенности:</h3><ul>${info.features.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
        `;
        modal.classList.remove('hidden');
    }

    // Закрытие
    closeBtn.onclick = () => modal.classList.add('hidden');
    window.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };

    // Подключаем прослушивание к контейнерам
    document.querySelector('.races-container').addEventListener('click', handleInfoClick);
    document.querySelector('.classes-container').addEventListener('click', handleInfoClick);

    // Ваш существующий код выбора элементов
    let selectItem = (containerSelector, field, callback) => {
        document.querySelector(containerSelector).addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (!card || e.target.closest('.info-btn')) return;
            
            character[field] = card.id;
            if (field === 'race') document.querySelector(containerSelector).remove();
            if (callback) callback();
        });
    };

    selectItem('.races-container', 'race', renderClassCards);
    selectItem('.classes-container', 'class', updateStats);
}

function rollStat() {
    const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    let sum = rolls[0] + rolls[1] + rolls[2];
    if (sum >= 17 && Math.random() < 0.6) sum--;
    if (sum === 18 && Math.random() < 0.7) sum --;
    return sum;
}

function applyRaceBonuses() {
    document.querySelector('.stats-manual-selection').remove();
    const bonuses = racebonus[character.race];
    if (!bonuses) return;
    const freeBonusKeys = Object.keys(bonuses).filter(key => key.includes('free'));
    if (freeBonusKeys.length > 0) {
        renderFreeBonusSelection(bonuses, freeBonusKeys);
    } else {
        for (let [stat, value] of Object.entries(bonuses)) {
            if (character.stats[stat] !== undefined) {
                character.stats[stat] += value;
            }
        }
        startLoadoutPhase();
    }
}

function checkCompletion() {
    const assignedStats = Object.keys(character.stats);
    if (assignedStats.length === 6) {
        applyRaceBonuses();
    } else {
        alert('Назначь приоритет всем характеристикам!');
    }
}

function updateSelectOptions(selects) {
    const picked = Array.from(selects).map(s => s.value).filter(v => v !== "");
    selects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(opt => {
            if (opt.value !== "" && picked.includes(opt.value) && opt.value !== select.value) {
                opt.disabled = true;
            } else {
                opt.disabled = false;
            }
        });
    });
}

function startLoadoutPhase() {
    const classData = loadouts[character.class];
    if (!classData) return;
    document.querySelector('.character-creation').innerHTML = `<div class = "loadout-container"></div>`;
    const container = document.querySelector('.loadout-container');
    character.equipments = [...classData.autoEquipment];
    renderSkills(classData.skills);
    renderChoices(classData.weaponChoice, 'weapons', 'Выберите оружие');
    renderChoices(classData.equipmentChoice, 'equipments', 'Выберите снаряжение');
    container.innerHTML += `<button onclick = "renderSpellsPhase()" class = "btn-finish">Продолжить</button>`;
}

function handleChoice(field, groupIndex, radio, isCustom) {
    const groupInputs = radio.closest('.choice-group').querySelectorAll('.custom-input');
    groupInputs.forEach(i => i.classList.add('hidden'));
    if (isCustom) {
        const textInput = radio.closest('.option-row').querySelector('.custom-input');
        textInput.classList.remove('hidden');
        textInput.oninput = () => {
            updateCharacterList(field, groupIndex, textInput.value);
        };
    } else {
        updateCharacterList(field, groupIndex, radio.value);
    }
}

function updateCharacterList(field, groupIndex, value) {
    // Используем вспомогательный объект для хранения выборов по группам
    if (!character[`_${field}Groups`]) {
        character[`_${field}Groups`] = {};
    }
    
    character[`_${field}Groups`][groupIndex] = value;
    
    // Превращаем объект групп обратно в чистый массив значений
    character[field] = Object.values(character[`_${field}Groups`]);
}

function handleChoiceSelection(radio) {
    const groupDiv = radio.closest('.choice-group');
    const field = groupDiv.dataset.field;
    const groupIndex = groupDiv.dataset.group;
    const parentRow = radio.closest('.option-row');
    const isCustom = radio.dataset.isCustom === "true";
    groupDiv.querySelectorAll('.custom-input').forEach(input => input.classList.add('hidden'));
    if (isCustom) {
        const textInput = parentRow.querySelector('.custom-input');
        textInput.classList.remove('hidden');
        textInput.focus();
        textInput.oninput = () => {
            updateCharacterList(field, groupIndex, textInput.value);
        };
        if (textInput.value) updateCharacterList(field, groupIndex, textInput.value);
    } else {
        updateCharacterList(field, groupIndex, radio.value);
    }
}