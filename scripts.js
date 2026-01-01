// JSON ФАЙЛИК ДЛЯ ИНФО КНОПКИ
let racesData = {};

fetch('./data/races.json')
    .then(response => response.json())
    .then(data => {
        racesData = data;
    })
    .catch(err => console.error('Ошибка загрузки JSON:', err));

// МОДАЛЬНОЕ ОКОШКО
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.modal-close');

// ДАННЫЕ ДЛЯ КЛАССОВ И РАСС
CLASS_SPELLS = {
    bard: {
        choose0: 2,
        spells0: ['Анализ устройства', 'Визитная карточка', 'Волшебная рука', 'Драконий рёв', 'Дружба', 'Зашифровать/расшифровать', 'Защита от оружия', 'Злая насмешка', 'Крепкий росток', 'Малая иллюзия', 'Меткий удар', 'Оплетающая лоза', 'Писарь', 'Пляшущие огоньки', 'Починка', 'Раскат грома', 'Свет', 'Сообщение', 'Фокусы'],
        choose1: 4,
        spells1: ['Безмолвный образ', 'Беседа с драконом', 'Беспорядочный рост', 'Волна грома', 'Вопрос с подвохом', 'Героизм', 'Дар Локи', 'Диссонирующий шепот', 'Древесный мост', 'Дрожь земли', 'Дружба с животными', 'Жуткий смех Таши', 'Запомнить', 'Злополучное слово', 'Корректировка позиции', 'Лечащее слово', 'Лечение ран', 'Максировка', 'Машинная речь', 'Маятник', 'Найти изъян', 'Невидимое письмо', 'Невидимый слуга', 'Неутомимость', 'Обнаружение магии', 'Огонь фей', 'Опознание', 'Ослабление брони', 'Острые листья', 'Очарование личности', 'Падение перышком', 'Ползущая рука', 'Понимание языков', 'Порча', 'Почетный гость', 'Привлекательный подарок', 'Призрачный свет', 'Приказ', 'Разговор с животными', 'Сверкающие брызги', 'Современное предупреждение', 'Скороход', 'Сломанный заряд', 'Споры телепатической связи', 'Стальное сердце', 'Усыпление', 'Экстракт Фойсона', 'Ярость кобольдов']
    },
    wizard: {
        choose0: 3,
        spells0: ['Анализ устройства', 'Благословенная защита', 'Брызги кислоты', 'Визитная карточка', 'Власть над огнём', 'Воздушный хлыст', 'Волшебная рука', 'Вспышка мечей', 'Вспышка мечей', 'Громовой клинок', 'Громовой клинок', 'Драконий рёв', 'Дружба', 'Железный кулак', 'Зашифровать/расшифровать', 'Защита от оружия', 'Звёздный взрыв', 'Изменение растений', 'Иней', 'Каменный обстрел', 'Клинок зелёного пламени', 'Клинок зелёного пламени', 'Когти тьмы', 'Крепкий росток', 'Лассо молнии', 'Леденящее прикосновение', 'Лепка земли', 'Луч холода', 'Малая иллюзия', 'Меткий удар', 'Нашествие', 'Обессиливающий укол', 'Обморожение', 'Огненный заряд', 'Оплетающая лоза', 'Оплошность', 'Ослепление тенью', 'Остановка', 'Писарь', 'Пляшущие огоньки', 'Погасить свет', 'Погребальный звон', 'Починка', 'Пронзающий шип', 'Раскат грома', 'Расщепление разума', 'Свет', 'Силуэт', 'Сообщение', 'Сотворение костра', 'Укус тени', 'Фокусы', 'Формирование воды', 'Шквал', 'Электрошок', 'Ядовитые брызги'],
        choose1: 6,
        spells1: ['Алая плеть', 'Ангельский защитник', 'Безмолвный образ', 'Беседа с драконом', 'Беспорядочный рост', 'Бронированный панцирь', 'Броня теней', 'Ведьмин снаряд', 'Воздушный туннель', 'Волна грома', 'Волновой барьер', 'Волшебная стрела', 'Вопрос с подвохом', 'Вызов страха', 'Глубокий вздох', 'Громовой разряд', 'Грузоподъемность машины', 'Дар готовности', 'Доспехи мага', 'Древесный мост', 'Дрожь земли', 'Едкое варево Таши', 'Жуткий смех Таши', 'Заволакивающая тьма', 'Заморозить питье', 'Запомнить', 'Защита от добра и зла', 'Злополучное слово', 'Идентифицирование нашептывания', 'Катапульта', 'Кольцо ветра', 'Кольцо отталкивания', 'Комариная погибель', 'Корректировка позиции', 'Ледяной кинжал', 'Луч болезни', 'Маскировка', 'Машинная речь', 'Маятник', 'Найти изъян', 'Невидимое письмо', 'Невидимый слуга', 'Нейтрализация ауры', 'Неутомимость', 'Оберег из козьего копыта', 'Обнаружение магии', 'Огненные ладони', 'Оживление конструкта', 'Опознание', 'Ослабление брони', 'Острые листья', 'Очарование личности', 'Падение пёрышком', 'Плащ теней', 'Поглощение', 'Поглощение стихий', 'Поиск фамильяра', 'Ползущая рука', 'Понимание языков', 'Поспешное отступление', 'Почётный гость', 'Привлекательный подарок', 'Призрачный свет', 'Притяжение', 'Прыжок', 'Псевдожизнь', 'Путеводная звезда', 'Разговор с предметами', 'Рука гаи', 'Руки из тени', 'Сверкающие брызги', 'Своевременное предупреждение', 'Связь с землёй', 'Сигнал тревоги', 'Силок', 'Скольжение', 'Скороход', 'Сломанный заряд', 'Споры телепатической связи', 'Стальное сердце', 'Тензеров парящий диск', 'Туманное облако', 'Усыпление', 'Хромая кляча', 'Цветной шарик', 'Черные ленты', 'Щит', 'Щит шерстерней', 'Экстракт Фойсона', 'Ярость кобольда'] 
    },
    druid: {
        choose0: 2,
        spells0: ['Власть над огнем', 'Волшебный камень', 'Дубинка', 'Изменение растений', 'Исскуство друидов', 'Крепкий росток', 'Лепка земли', 'Нашествие', 'Обморожение', 'Оплетающая лоза', 'Первобытная дикость', 'Починка', 'Пронзающий шип', 'Раскат грома', 'Сопротивлеине', 'Сотворение костра', 'Сотворение пламени', 'Терновый кнут', 'Указание', 'Формирование воды', 'Чувство охотника', 'Шипастый щит', 'Шквал', 'Ядовитые брызги'],
        choose1: 0,
        spells1: []
    },
    cleric: {
        choose0: 3,
        spells0: ['Благословенная защита', 'Благословение мертвых', 'Железный кулак', 'Зашифровать/расшифровать', 'Оплетающая лоза', 'Оплошность', 'Писарь', 'Погребальный звон', 'Починка', 'Свет', 'Священное пламя', 'Слово Сияния', 'Сопротивление', 'Указание', 'Уход за умирающим', 'Чудотворство', 'Шипастый щит'],
        choose1: 0,
        spells1: []
    },
    artificer: {
        choose0: 2,
        spells0: ['Брызги кислоты', 'Волшебная рука', 'Волшебный камень', 'Вспышка мечей', 'Громовой клинок', 'Клинок зеленого пламени', 'Лассо молнии', 'Луч холода', 'Обморожение', 'Огненный заряд', 'Пляшущие огоньки', 'Починка', 'Раскат грома', 'Свет', 'Сообщение', 'Сопротивление', 'Сотворение костра', 'Терновый кнут', 'Указание', 'Уход за умирающим', 'Фокусы', 'Электрошок', 'Ядовитые брызги'],
        choose1: 0,
        spells1: []
    },
    warlock: {
        choose0: 2,
        spells0: ['Визитная карточка', 'Воздушный хлист', 'Волшебная рука', 'Волшебный камень', 'Вспышка мечей', 'Громовой клинок', 'Дружба', 'Защита от оружия', 'Иней', 'Каменный обстрел', 'Клинок зеленого пламени', 'Когти тьмы', 'Лассо молнии', 'Леденящее прикосновение', 'Малая иллюзия', 'Меткий удар', 'Мистический заряд', 'Нашествие', 'Обморожение', 'Оплетывающая лоза', 'Погасить свет', 'Погребальный звон', 'Пронзающий шип', 'Раскат грома', 'Расщепление разума', 'Сотворение костра', 'Фокусы', 'Ядовитые брызги'],
        choose1: 2,
        spells1: ['Адское возмездие', 'Алая плеть', 'Ангельский защитник', 'Бронированный панцирь', 'Броня теней', 'Ведьмин снаряд', 'Воздушный туннель', 'Волновой барьер', 'Вызов страха', 'Грузоподъемность машины', 'Доспех Агатиса', 'Драконий удар', 'Заволакивающая сила', 'Защита от добра и зла', 'Идентификационные нашептывания', 'Кольцо ветра', 'Кольцо отталкивания', 'Корректировка позиции', 'Маятник', 'Найти родню', 'Невидимое письмо', 'Невидимый слуга', 'Острые листья', 'Очарование личности', 'Ползущая рука', 'Понимание языков', 'Поспешное отступление', 'Пришпорить скакуна', 'Рука гаи', 'Руки Хадара', 'Сглаз', 'Споры телепатической связи', 'Хромая кляча', 'Черные ленты']
    },
    sorcerer: {
        choose0: 4,
        spells0: ['Брызги кислоты', 'Визитная карточка', 'Власть над огнем', 'Воздушный хлыст', 'Волшебная рука', 'Вспышка мечей', 'Громовой клинок', 'Дружба', 'Защита от оружия', 'Изменения растений', 'Иней', 'Каменный обстрел', 'Клинок зеленого пламени', 'Клуб дыма', 'Когти тьмы', 'Лассо молнии', 'Леденящее прикосновение', 'Лепка земли', 'Луч холода', 'Малая иллюзия', 'Меткий удар', 'Нашествие', 'Обморожение', 'Огненный снаряд', 'Оплетающая лоза', 'Остановка', 'Пляшущие огоньки', 'Погасить свет', 'Починка', 'Пронзающий шип', 'Раскат грома', 'Расщепление разума', 'Свет', 'Сообщение', 'Сотворение костра', 'Удар грома', 'Фокусы', 'Формирование воды', 'Шквал', 'Электрошок', 'Ядовитые брызги'],
        choose1: 2,
        spells1: ['Безмолвный образ', 'Беспорядочный рост', 'Бронированный панцирь', 'Броня теней', 'Ведьмин снаряд', 'Воздушный туннель', 'Волна грома', 'Волновой барьер', 'Волшебная стрела', 'Доспехи мага', 'Древесный мост', 'Дрожь земли', 'Дуновение', 'Едкое варево Таши', 'Заволакивающая тьма', 'Идентификационные нашептывания', 'Катапульта', 'Кольцо ветра', 'Кольцо отталкивания', 'Ледяной кинжал', 'Луч болезни', 'Маскировка', 'Нейтрализация ауры', 'Обнаружение магии', 'Огненные ладони', 'Острые листья', 'Очарование личности', 'Падение перышком', 'Поглощение', 'Поглощение стихий', 'Ползущая рука', 'Понимание языков', 'Поспешное отступление', 'Призрачный свет', 'Прыжок', 'Псевдожизнь', 'Сверкающие брызги', 'Скольжение', 'Снаряд хаоса', 'Споры телепатической связи', 'Туманное облако', 'Усыпление', 'Цветной шарик', 'Черные ленты', 'Щит']
    }
};
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
};
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
    },
    barbarian: {
        skills: {
            choose: 2,
            options: ['Атлетика', 'Выживание', 'Природа', 'Уход за животными', 'Запугивание', 'Внимательность']
        },
        weaponChoice: [
            ['Секира', {custom: 'Любое воинское рукопашное оружие'}],
            ['Два ручных топора', {custom: 'Любое простое оружие'}]
        ],
        equipmentChoice: [],
        autoEquipment: [
            'Легкая броня',
            'Щит'
        ]
    },
    fighter: {
        skills: {
            choose: 2,
            options: ['Атлетика', 'Акробатика', 'История', 'Уход за животными', 'Проницательность', 'Внимательность', 'Выживание', 'Запугивание']
        },
        weaponChoice: [
            ['Длинный меч', {custom: 'Любое воинское рукопашное оружие'}],
            ['Легкий арбалет и 20 болтов', 'Два ручных топора']
        ],
        equipmentChoice: [
            ['Кольчуга', 'Легкая броня'],
            ['Набор исследователя подземелий', 'Набор путешественника']
        ],
        autoEquipment: [
            'Щит'
        ]
    },
    wizard: {
        skills: {
            choose: 2,
            options: ['История', 'Анализ', 'Магия', 'Медицина', 'Проницательность', 'Религия']
        },
        weaponChoice: [
            ['Кинжал', 'Боевой посох']
        ],
        equipmentChoice: [
            ['Магическая фокусировка', 'Мешочек с компонентами'],
            ['Набор путешественника', 'Набор ученого']
        ],
        autoEquipment: [
            'Книга заклинаний'
        ]
    },
    druid: {
        skills: {
            choose: 2,
            options: ['Природа', 'Уход за животными', 'Магия', 'Проницательность', 'Внимательность', 'Выживание', 'Магия', 'Медицина', 'Религия']
        },
        weaponChoice: [
            ['Скимитар', {custom: 'Любое простое оружие'}],
        ],
        equipmentChoice: [
            ['Деревянный щит', {custom: 'Любое легкое оружие'}],
        ],
        autoEquipment: [
            'Кожаная броня',
            'Друидическая фокусировка',
            'Набор путешественника'
        ]
    },
    cleric: {
        skills: {
            choose: 2,
            options: ['История', 'Убеждение', 'Медицина', 'Проницательность', 'Религия']
        },
        weaponChoice: [
            ['Боевой молот', 'Булава'],
            ['Легкий арбалет и 20 болтов', {custom: 'Любое простое оружие'}]
        ],
        equipmentChoice: [
            ['Чешучайтый доспех', 'Кожаная броня', 'Кольчуга'],
            ['Набор священника', 'Набор путешественника']
        ],
        autoEquipment: [
            'Щит',
            'Священный символ'
        ]
    },
    artificer: {
        skills: {
            choose: 2,
            options: ['История', 'Анализ', 'Магия', 'Медицина', 'Природа', 'Внимательность', 'Ловкость рук']
        },
        weaponChoice: [
            ['Кинжал', {custom: 'Любое простое оружие'}],
            ['Два ручных топора', {custom: 'Любое простое оружие'}],
        ],
        equipmentChoice: [
            ['Кожаный проклепанный доспех', 'Чешучайтый доспех']
        ],
        autoEquipment: [
            'Воровские инструменты',
            'Набор исследователя подземелий'
        ]
    },
    warlock: {
        skills: {
            choose: 2,
            options: ['История', 'Анализ', 'Магия', 'Обман', 'Запугивание', 'Природа', 'Религия']
        },

        weaponChoice: [
            ['Легкий арбалет и 20 болтов', {custom: 'Любое простое оружие'}]
        ],
        equipmentChoice: [
            ['Мешочек с компонентами', 'Магическая фокусировка'],
            ['Набор путешественника', 'Набор ученого']
        ],
        autoEquipment: [
            'Два кинжал',
            'Кожаная броня'
        ]
    },
    monk: {
        skills: {
            choose: 2,
            options: ['Атлетика', 'Акробатика', 'История', 'Проницательность', 'Религия', 'Скрытность']
        },
        weaponChoice: [
            ['Короткий меч', {custom: 'Любое простое оружие'}],
        ],
        equipmentChoice: [
            ['Набор путешественника', 'Набор исследователя подземелий']
        ],
        autoEquipment: [
            '10 дротиков',
        ]
    },
    paladin: {
        skills: {
            choose: 2,
            options: ['Атлетика', 'Выживание', 'История', 'Проницательность', 'Религия', 'Убеждение']
        },
        weaponChoice: [
            ['Длинный меч', {custom: 'Любое воинское рукопашное оружие'}],
            ['Пять метательных копий', {custom: 'Любое простое оружие'}]
        ],
        equipmentChoice: [
            ['Набор священника', 'Набор путешественника']
        ],
        autoEquipment: [
            'Кольчуга',
            'Щит',
            'Священный символ'
        ]
    },
    rogue: {
        skills: {
            choose: 4,
            options: ['Атлетика', 'Акробатика', 'Ловкость рук', 'Скрытность', 'Проницательность', 'Внимательность', 'Обман', 'Запугивание', 'Выступление', 'Убеждение']
        },
        weaponChoice: [
            ['Рапира', 'Короткий меч'],
            ['Короткий лук и колчан с 20 стрелами', 'Короткий меч']
        ],
        equipmentChoice: [
            ['Набор взломщика', 'Набор исследователя подземелий', 'Набор путешественника']
        ],
        autoEquipment: [
            'Кожаная броня',
            'Два кинжала',
            'Воровские инструменты'
        ]
    },
    ranger: {
        skills: {
            choose: 3,
            options: ['Атлетика', 'Выживание', 'Природа', 'Проницательность', 'Внимательность', 'Скрытность', 'Анализ', 'Уход за животными']
        },
        weaponChoice: [
            ['Два коротких меча', {custom: 'Два простых рукопашных оружия'}]
        ],
        equipmentChoice: [
            ['Набор исследователя подземелий', 'Набор путешественника'],
            ['Чешучайтый доспех', 'Кожаная броня']
        ],
        autoEquipment: [
            'Колчан с 20 стрелами',
            'Длинный лук'
        ]
    },
    sorcerer: {
        skills: {
            choose: 2,
            options: ['Магия', 'Проницательность', 'Религия', 'Убеждение', 'Запугивание', 'Обман']
        },
        weaponChoice: [
            ['Легкий арбалет с 20 болтами', {custom: 'Любое простое оружие'}]
        ],
        equipmentChoice: [
            ['Мешочек с компонентами', 'Магическая фокусировка'],
            ['Набор путешественника', 'Набор исследователя подземелий']
        ],
        autoEquipment: [
            'Два кинжала'
        ]
    }
};
let character = {
        race: null,
        class: null,
        stats: {},
        equipments: {},
        skills: {},
        weapons: {},
        spells: {
            spells0: [],
            spells1: []
        },
        name: null
};

// ИНФО КНОПКА
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const race = racesData[btn.dataset.race];
        if (!race) return;
        modalTitle.textContent = race.name;
        modalText.textContent = race.description;
        modal.classList.add('active');
    });
});

// КНОПОЧКИ И РЕАКЦИИ В МОДУЛЬНОМ ОКНЕ
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
function closeModal() {
    modal.classList.remove('active');
};

// ПРОГРЕСС БАР И ЕГО ЭЛЕМЕНТЫ
const steps = document.querySelectorAll('.step');
const progressSteps = document.querySelectorAll('.progress-step');
let currentStep = 0;
function goToStep(index) {
    steps.forEach(s => s.classList.remove('active'));
    progressSteps.forEach(p => p.classList.remove('active'));
    steps[index].classList.add('active');
    progressSteps[index].classList.add('active');
    currentStep = index;
};

// ВЫбОР КАРТОЧКИ РАСЫ
document.querySelectorAll('#step-race .card').forEach(card => {
    card.addEventListener('click', () => {
        character.race = card.dataset.race; // ТУТ ВЫБРАЛАСЬ РАСА
        goToStep(1);
    });
});

// ВЫБОР КАРТОЧКИ КЛАССА
document.querySelectorAll('#step-class .card').forEach(card => {
    card.addEventListener('click', () => {
        character.class = card.dataset.class; // ТУТ ВЫБРАЛСЯ КЛАСС
        generateAndShowStats();
        goToStep(2);
    });
});

// ГЕНЕРАЦИЯ ХАРАКТЕРИСТИК И Т.П.
function rollStat() { // ГЕНЕРИРОВАТЬ 4 КУБИКА
    const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    let sum = rolls[0] + rolls[1] + rolls[2];
    if (sum >= 17 && Math.random() < 0.6) sum--;
    if (sum === 18 && Math.random() < 0.7) sum --;
    return sum;
};
function generateStats() {
    return Array.from({length: 6}, rollStat).sort((a, b) => b - a); // МАССИВ С 6 СЛУЧАЙНМИ ОТСОРТИРОВАННЫМИ ЗНАЧЕНИЯМИ
};
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
        character.stats[stat] = value; // ЗДЕСЬ ПРИЧИСЛИЛИСЬ ПРИОРИТЕТНЫХ ХАРАКТЕРИСТИКИ
    });
    const remainingStats = Object.keys(STAT_NAMES).filter(s => !assigned[s]);
    remainingStats.forEach((stat, i) => {
        const statValue = values[i];
        container.innerHTML += `
            <div class = "stat selectable">
                <select class = "stat-selector" data-value = "${statValue}">
                    <option value = "">-- Выберите --</option>
                    ${remainingStats.map(s => 
                        `<option value = "${s}">${STAT_NAMES[s]}</option>`
                    ).join('')}
                </select>
                <span class = "value-preview">${statValue}</span>
            </div>`
    });
    const freeBonuses = getFreeRaceBonuses(character.race);
    const statsContainer = document.getElementById('stats-container');
    if (freeBonuses.length) {
        renderFreeBonusSelection(statsContainer, freeBonuses);
        preventDuplicateSelections(statsContainer);
    }
};
document.getElementById('confirm-stats').addEventListener('click', () => {
    let allSelected = true;
    document.querySelectorAll('.stat-selector').forEach(select => {
        const statKey = select.value;
        const statValue = Number(select.dataset.value);
        if (statKey) {
            character.stats[statKey] = statValue;
        } else {
            allSelected = false;
        }
    });
    if(!allSelected) {
        alert("РАСПРЕДЕЛИ ВСЕ НАСТРОЙКИ!");
        return;
    }
    applyFixedRaceBonuses(character.stats, character.race);
    goToStep(3);
    renderClassEquipment();
});
function applyFixedRaceBonuses(stats, race) {
    const bonuses = RACE_BONUSES[race];
    if (!bonuses) return stats;
    for (const [key, value] of Object.entries(bonuses)) {
        if (!key.startsWith('free')) {
            stats[key] += Number(value);
        }
    }
};
function getFreeRaceBonuses(race) {
    const bonuses = RACE_BONUSES[race];
    if (!bonuses) return [];
    return Object.entries(bonuses)
        .filter(([key]) => key.startsWith('free'))
        .map(([_, value]) => value);
};
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
};
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
};
function applyFreeRaceBonuses(stats, container) {
    container.querySelectorAll('select').forEach(select => {
        const stat = select.value;
        const bonus = Number(select.dataset.bonus);
        stats[stat] += bonus;
    });
}

// ЭКИПИРОВКА ПЕРСОНАЖА
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
    container.innerHTML += `
        <div class = 'weapon-selection-group'>
            <h3>Выберите оружие</h3>`
    loadout.weaponChoice.forEach((options, i) => {
        const optionsHTML = options.map(o => {
            if (typeof o === 'string') {
                return `<option value="${o}">${o}</option>`;
            } else if (o.custom) {
                return `<option value="custom">${o.custom}</option>`;
            }
        }).join('');
        container.innerHTML += `
                <select class = "weapon-select">
                    ${optionsHTML}
                </select>
                <input type = "text" class = "custom-weapon-input" placeholder = "Укажите оружие" style = "display: none; margin-top: 10px;">
            </div><br>
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
            };
        };
    });
    container.innerHTML += `
        <div class = "equipment-block">
            <h3>Выберите снаряжение</h3>`;
    if (loadout.equipmentChoice.length) {
    loadout.equipmentChoice.forEach((options, i) => {
            const optionsHTML = options.map(o => {
                if (typeof o === 'string') {
                    return `<option value="${o}">${o}</option>`;
                } else if (o.custom) {
                    return `<option value="custom">${o.custom}</option>`;
                }
            }).join('');
            container.innerHTML += `
                    <select class = "equipment-select">
                    ${optionsHTML}
                    </select>
                    <input type = "text" class = "custom-equipment-input" placeholder = "Укажите снаряжение" style = "display: none; margin-top: 10px;">
                </div><br>
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
    };
    if (loadout.autoEquipment.length) {
        container.innerHTML += `
            <h3>Вы получаете автоматически</h3>
            <ul>
                ${loadout.autoEquipment.map(i => `<li>${i}</li>`).join('')}
            </ul>
        `;
    };
};
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
    character.equipments = [
        ...[...document.querySelectorAll('.equipment-select')].map(s => s.value),
        ...CLASS_LOADOUTS[character.class].autoEquipment
    ];
    console.log(character);
    goToStep(4);
    spellsStep();
});

// ЗАКЛИНАНИЯ ПЕРСОНАЖА
function spellsStep() {
    if (character.class === 'barbarian' || character.class === 'fighter' || character.class === 'rogue' || character.class === 'monk' || character.class === 'paladin' || character.class === 'ranger') {
        goToStep(5);
    } else {
        const container = document.getElementById('spells-container');
        container.innerHTML = '';
        const spells = CLASS_SPELLS[character.class];
        if (!spells) return;
        container.innerHTML = '<h3>Выберите себе желаемые заклинания</h3>'
        container.innerHTML += `<h4>Выберите ${spells.choose0} заговоров</h4>`
        const spellsHTML = spells.spells0.map(spellName => `
            <label>
                <input type = "checkbox" class = "spell-checkbox" data-level = "spells0" value = "${spellName}">
                ${spellName}
            </label>`
        ).join('');
        container.innerHTML += spellsHTML;
        const spellsName1 = '';
        if (spells.choose1) {
            container.innerHTML += `<h4>Выберите ${spells.choose1} заклинаний 1 уровня`
            spellsHTML1 = spells.spells1.map(spellName => `
                <label>
                    <input type = "checkbox" class = "spell-checkbox" data-level = "spells1" value = "${spellName}">
                    ${spellName}
                </label>`
            ).join('');
        };
        container.innerHTML += spellsHTML1;
    };
};
document.getElementById("confirm-spells").addEventListener('click', () => {
    document.querySelectorAll('.spell-checkbox:checked').forEach(checkbox => {
        const level = checkbox.dataset.level;
        const spellName = checkbox.value;
        character.spells[level].push(spellName);
    });
    const spellsInfo = CLASS_SPELLS[character.class];
    goToStep(5);
});
document.getElementById("finish").addEventListener('click', () => {
    character.name = document.getElementById("char-name").value;
    goToStep(6);
    const mychar = document.getElementById("mychar");
    mychar.innerHTML = 'Имя твоего персонажа: ' + character.name + '<br>';
    mychar.innerHTML += 'Раса твоего персонажа: ' + character.race + '<br>';
    mychar.innerHTML += 'Класс твоего персонажа: ' + character.class + '<br>';
    mychar.innerHTML += 'Характеристики:<br>Сила: ' + character.stats.str + '. Модификатор: ' + Math.floor((Number(character.stats.str) - 10) / 2) + '<br>';
    mychar.innerHTML += 'Ловкость: ' + character.stats.dex + '. Модификатор: ' + Math.floor((Number(character.stats.dex) - 10) / 2) + '<br>';
    mychar.innerHTML += 'Телосложение: ' + character.stats.con + '. Модификатор: ' + Math.floor((Number(character.stats.con) - 10) / 2) + '<br>';
    mychar.innerHTML += 'Мудрость: ' + character.stats.wis + '. Модификатор: ' + Math.floor((Number(character.stats.wis) - 10) / 2) + '<br>';
    mychar.innerHTML += 'Интеллект: ' + character.stats.int + '. Модификатор: ' + Math.floor((Number(character.stats.int) - 10) / 2) + '<br>';
    mychar.innerHTML += 'Харизма: ' + character.stats.cha + '. Модификатор: ' +  Math.floor((Number(character.stats.cha) - 10) / 2) + '<br>';
    mychar.innerHTML += 'Доступные заговоры:<br>';
    character.spells.spells0.forEach(spell => {
        mychar.innerHTML += `${spell},<br>`; 
    });
    mychar.innerHTML += 'Доступные заклинания 1-ого уровня:<br>';
    character.spells.spells1.forEach(spell => {
        mychar.innerHTML += `${spell},<br>`;
    });
    mychar.innerHTML += 'Ваше оружие: ';
    character.weapons.forEach(weapon => {
        mychar.innerHTML += `${weapon}, `;
    });
    mychar.innerHTML += '<br>Ваш инвентарь: ';
    character.equipments.forEach(equipment => {
        mychar.innerHTML += `${equipment}, `;
    });
    mychar.innerHTML += '<br>Ваши навыки: ';
    character.skills.forEach(skill => {
        mychar.innerHTML += `${skill}, `;
    });
});