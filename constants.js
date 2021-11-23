const FONT_SIZE_SMALL = 14;
const FONT_SIZE_AVERAGE = 16;
const FONT_SIZE_LARGE = 18;
const FONT_FAMILY = "Calibri";

const TEXT_SIGNIFICANT = "Заметность";
const TEXT_UNSIGNIFICANT = "Незаметность";
const TEXT_PRESENT = "Настоящее";
const TEXT_PAST = "Прошлое";

const BACKGROUND_WIDTH_INITIAL = 800;
const BACKGROUND_HEIGHT_INITIAL = 700;

const MARKS_SPAWN_TEXT = "Расположите два события:";

const COLORS = {
  red: "#ff0000",
  blue: "#0000ff",
  tooltip: "#f0f0f0",
  text: "#000000",
  marksSpawnBackground: "#c2c0ba30",
  marksSpawnStroke: "#000000",
};

const ALERT_TEXT_OUT_OF_EVENTS = "События закончились!";
const ALERT_TEXT_UNKNOWN =
  "Возникла неизвестная ошибка! Пожалуйста, сообщите нам о ней!";
const ALERT_TEXT_MARKS_NOT_IN_AREA = "Пожалуйста, поместите обе метки на поле.";

const TOOLTIP_ID = "tooltip";
const TOOLTIP_WIDTH = 400;
const TOOLTIP_STROKE_WIDTH = 3;
const TOOLTIP_TEXT_ALIGN = "center";

const EVENTS = [
  {
    first: {
      id: 1,
      name: "Создание Пермской городской думы",
    },
    second: {
      id: 2,
      name: "Первое заседание Пермской городской Думы в составе РФ",
    },
  },
  {
    first: {
      id: 3,
      name: "Пребывание в Перми Чехова",
    },
    second: {
      id: 4,
      name: "Пребывание в Перми Пастернака",
    },
  },
  {
    first: {
      id: 5,
      name: "Пребывание в Перми Дягилева",
    },
    second: {
      id: 6,
      name: "Пребывание в Перми Курентзиса",
    },
  },
  {
    first: {
      id: 7,
      name: "Деятельность в Перми Ф.Х. Грааля",
    },
    second: {
      id: 8,
      name: "Активная деятельность Мешкова",
    },
  },
  {
    first: {
      id: 9,
      name: "Постройка станции Пермь II",
    },
    second: {
      id: 10,
      name: "Постройка Аэропорта Большое Савино",
    },
  },
  {
    first: {
      id: 11,
      name: "Открытие Обелисков и ротонды в честь приезда Александра I",
    },
    second: {
      id: 12,
      name: "Убийство Михаила Александровича Романова",
    },
  },
  {
    first: {
      id: 13,
      name: "Открытие первого металлургического завода",
    },
    second: {
      id: 14,
      name: "Открытие первого моторостроительного завода",
    },
  },
  {
    first: {
      id: 15,
      name: "Эвакуация Ленинградского академического театра оперы и балета им. С.М. Кирова в Пермь",
    },
    second: {
      id: 16,
      name: '"Культурная революция" Чиркунова',
    },
  },
  {
    first: {
      id: 17,
      name: "Наместничество Модераха",
    },
    second: {
      id: 18,
      name: "Губернаторство Игумнова/Трутнев",
    },
  },
];
