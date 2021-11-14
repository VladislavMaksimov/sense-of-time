const FONT_SIZE_SMALL = 14;
const FONT_SIZE_LARGE = 20;
const FONT_FAMILY = "Calibri";
const TEXT_COLOR = "#000000";

const TEXT_SIGNIFICANT = "Заметность";
const TEXT_UNSIGNIFICANT = "Незаметность";
const TEXT_PRESENT = "Настоящее";
const TEXT_PAST = "Прошлое";

const BACKGROUND_WIDTH_INITIAL = 800;
const BACKGROUND_HEIGHT_INITIAL = 700;

const MARKS_SPAWN_BACKGROUND_COLOR = "#c2c0ba30";
const MARKS_SPAWN_STROKE_COLOR = "#000000";
const MARKS_SPAWN_TEXT = "Расположите два события:";

const COLORS = {
  red: "#ff0000",
  blue: "#0000ff",
};

const EVENTS = [
  {
    first: "Создание Пермской городской думы",
    second: "Первое заседание Пермской городской Думы в составе РФ",
  },
  {
    first: "Пребывание в Перми Чехова",
    second: "Пребывание в Перми Пастернака",
  },
  {
    first: "Пребывание в Перми Дягилева",
    second: "Пребывание в Перми Курентзиса",
  },
  {
    first: "Деятельность в Перми Ф.Х. Грааля",
    second: "Активная деятельность Мешкова",
  },
  {
    first: "Постройка станции Пермь II",
    second: "Постройка Аэропорта Большое Савино",
  },
  {
    first: "Открытие Обелисков и ротонды в честь приезда Александра I",
    second: "Убийство Михаила Александровича Романова",
  },
  {
    first: "Открытие первого металлургического завода",
    second: "Открытие первого моторостроительного завода",
  },
  {
    first:
      "Эвакуация Ленинградского академического театра оперы и балета им. С.М. Кирова в Пермь",
    second: '"Культурная революция" Чиркунова',
  },
  {
    first: "Наместничество Модераха",
    second: "Губернаторство Игумнова/Трутнев",
  },
];

const ALERT_TEXT_OUT_OF_EVENTS = "События закончились!";
const ALERT_TEXT_UNKNOWN =
  "Возникла неизвестная ошибка! Пожалуйста, сообщите нам о ней!";
