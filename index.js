let stage = null;
let interactiveLayer = new Konva.Layer();
let tooltipLayer = new Konva.Layer();
let tooltip = null;
let marksSpawnArea = null;
let backgroundWidth = BACKGROUND_WIDTH_INITIAL;
let backgroundHeight = BACKGROUND_HEIGHT_INITIAL;
let marksSpawnHeight = BACKGROUND_HEIGHT_INITIAL / 5;
localStorage.setItem("currentEventsIndex", "0");

const redMarkCoords = {
  x: null,
  y: null,
};
const blueMarkCoords = {
  x: null,
  y: null,
};

// переводит координаты из системы элемента canvas (считаются от левого верхнего угла) в нашу систему координат
const translateCoords = (shape) => {
  const canvasCoordX = shape.getAttr("x");
  const canvasCoordY = shape.getAttr("y");
  const ourCoordX = canvasCoordX - backgroundWidth / 2;
  const ourCoordY = backgroundHeight / 2 - canvasCoordY;
  return { x: ourCoordX, y: ourCoordY };
};

// создаёт ось
const createCoordLine = (x, y, vectorX, vectorY, pointerLength) => {
  const pointerWidth = 10;
  const color = "#000000";
  const strokeWidth = 4;
  const lineJoin = "miter";
  const lineCap = "butt";

  return new Konva.Arrow({
    x: x,
    y: y,
    points: [0, 0, vectorX, vectorY],
    pointerLength: pointerLength,
    pointerWidth: pointerWidth,
    fill: color,
    stroke: color,
    strokeWidth: strokeWidth,
    lineJoin: lineJoin,
    lineCap: lineCap,
  });
};

// создаёт оси X и Y
const addCoordLines = (background) => {
  const pointerLength = 10;
  const halfOfCoordField = (backgroundHeight - marksSpawnHeight) / 2;
  const halfOfCoordLineY = halfOfCoordField - pointerLength - 15;
  const lengthOfCoordLineX = backgroundWidth - pointerLength;

  // ось X
  const xCoordLineX = (backgroundWidth - lengthOfCoordLineX) / 2;
  const yCoordLineX = marksSpawnHeight + halfOfCoordField;
  const vectorXCoordLineX = lengthOfCoordLineX;
  const vectorYCoordLineX = 0;
  const coordLineX = createCoordLine(
    xCoordLineX,
    yCoordLineX,
    vectorXCoordLineX,
    vectorYCoordLineX,
    pointerLength
  );

  // верхняя половина оси Y
  const xCoordLineYup = backgroundWidth / 2;
  const yCoordLineYup = marksSpawnHeight + halfOfCoordField;
  const vectorXCoordLineYup = 0;
  const vectorYCoordLineYup = -1 * halfOfCoordLineY;
  const coordLineYup = createCoordLine(
    xCoordLineYup,
    yCoordLineYup,
    vectorXCoordLineYup,
    vectorYCoordLineYup,
    pointerLength
  );

  // нижняя половина оси Y
  const xCoordLineYdown = backgroundWidth / 2;
  const yCoordLineYdown = marksSpawnHeight + halfOfCoordField;
  const vectorXCoordLineYdown = 0;
  const vectorYCoordLineYdown = halfOfCoordLineY;
  const coordLineYdown = createCoordLine(
    xCoordLineYdown,
    yCoordLineYdown,
    vectorXCoordLineYdown,
    vectorYCoordLineYdown,
    pointerLength
  );

  background.add(coordLineX);
  background.add(coordLineYup);
  background.add(coordLineYdown);

  addCoordTexts(background, halfOfCoordField, lengthOfCoordLineX);
};

const createCoordText = (content, x, y, fontSize) => {
  const textColor = "#000000";
  const fontFamily = "Calibri";
  return new Konva.Text({
    x: x,
    y: y,
    text: content,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fill: textColor,
  });
};

// создаёт текст на оси Y
const addCoordTexts = (background, halfOfCoordField, lengthOfCoordLineX) => {
  const fontSize = 16;

  const upTextContent = TEXT_SIGNIFICANT;
  const rightTextContent = TEXT_PRESENT;
  const downTextContent = TEXT_UNSIGNIFICANT;
  const leftTextContent = TEXT_PAST;

  // координаты начала текстов
  const upX = backgroundWidth / 2;
  const upY = marksSpawnHeight + 15;
  const rightX = backgroundWidth - (backgroundWidth - lengthOfCoordLineX) / 2;
  const rightY = marksSpawnHeight + halfOfCoordField;
  const downX = backgroundWidth / 2;
  const downY = backgroundHeight - 15;
  const leftX = (backgroundWidth - lengthOfCoordLineX) / 2;
  const leftY = marksSpawnHeight + halfOfCoordField;

  // создание текстов
  const upText = createCoordText(upTextContent, upX, upY, fontSize);
  const rightText = createCoordText(rightTextContent, rightX, rightY, fontSize);
  const downText = createCoordText(downTextContent, downX, downY, fontSize);
  const leftText = createCoordText(leftTextContent, leftX, leftY, fontSize);

  // сдвиг текстов вверх/вниз и вправо/влево
  upText.offsetX(-15);
  upText.offsetY(-5);
  rightText.offsetX(rightText.width());
  rightText.offsetY(rightText.height() + 14);
  downText.offsetX(-15);
  downText.offsetY(downText.height() + 5);
  leftText.offsetY(rightText.height() + 14);

  // добавление текстов на интерфейс
  background.add(upText);
  background.add(rightText);
  background.add(downText);
  background.add(leftText);
};

const createMarksSpawnEvent = (
  id,
  staticMarkColor,
  marksSpawnAreaWidth,
  name
) => {
  const event = new Konva.Group({
    x: 0,
    y: 0,
  });

  const radius = 4;
  const staticMark = new Konva.Circle({
    x: 0,
    y: 0,
    radius: radius,
    fill: staticMarkColor,
  });

  const textX = radius * 4;
  const textY = 0;
  const textWidth = marksSpawnAreaWidth / 2.5;
  const text = new Konva.Text({
    id: id,
    x: textX,
    y: textY,
    text: name,
    fontSize: FONT_SIZE_LARGE,
    width: textWidth,
    fontFamily: FONT_FAMILY,
    fill: COLORS.text,
  });
  alert(text.width());
  alert(text.fontSize());
  text.offsetY(text.fontSize() / 2 - radius / 2);

  if (staticMarkColor === "#ff0000") {
    eventOffsetX = textWidth + 20;
    redMarkCoords.x = marksSpawnAreaWidth / 2 - eventOffsetX + radius;
    redMarkCoords.y = marksSpawnHeight / 2 + 5 + 4 * radius;
  } else {
    eventOffsetX = -20;
    blueMarkCoords.x = marksSpawnAreaWidth / 2 + 20 + radius;
    blueMarkCoords.y = marksSpawnHeight / 2 + 5 + 4 * radius;
  }
  event.offsetX(eventOffsetX);

  event.add(staticMark);
  event.add(text);
  return event;
};

const createMarksSpawnEvents = (marksSpawnAreaWidth) => {
  const currentEventsIndex = Number(localStorage.getItem("currentEventsIndex"));
  const eventNames = EVENTS[currentEventsIndex];
  const firstEventName = eventNames.first.name;
  const secondEventName = eventNames.second.name;

  const events = new Konva.Group({
    id: "events",
    x: 0,
    y: marksSpawnHeight / 2 + 5,
  });

  const firstEvent = createMarksSpawnEvent(
    "first-event",
    COLORS.red,
    marksSpawnAreaWidth,
    firstEventName
  );
  const secondEvent = createMarksSpawnEvent(
    "second-event",
    COLORS.blue,
    marksSpawnAreaWidth,
    secondEventName
  );

  events.add(firstEvent);
  events.add(secondEvent);
  return events;
};

const createMarksSpawnText = () => {
  const x = 0;
  const y = 25;
  const text = new Konva.Text({
    x: x,
    y: y,
    text: MARKS_SPAWN_TEXT,
    fontSize: FONT_SIZE_LARGE,
    fontFamily: FONT_FAMILY,
    fill: COLORS.text,
  });
  text.offsetX(text.width() / 2);
  return text;
};

const drawMarksSpawn = (backgroundLayer) => {
  const marksSpawn = new Konva.Group({
    x: backgroundWidth / 2,
    y: 0,
  });

  marksSpawnArea = new Konva.Rect({
    width: backgroundWidth - 8,
    height: backgroundHeight / 5,
    fill: COLORS.marksSpawnBackground,
    stroke: COLORS.marksSpawnStroke,
    strokeWidth: 4,
    cornerRadius: 10,
  });
  marksSpawnArea.offsetX(marksSpawnArea.width() / 2);
  marksSpawnArea.offsetY(-5);

  marksSpawnHeight = marksSpawnArea.height();

  const text = createMarksSpawnText(marksSpawnArea.width());
  const events = createMarksSpawnEvents(marksSpawnArea.width());
  marksSpawn.add(marksSpawnArea);
  marksSpawn.add(text);
  marksSpawn.add(events);
  backgroundLayer.add(marksSpawn);
};

const drawBackground = (stage) => {
  const backgroundLayer = new Konva.Layer();

  drawMarksSpawn(backgroundLayer);
  addCoordLines(backgroundLayer, stage);

  stage.add(backgroundLayer);
  backgroundLayer.draw();
};

const restrictMovementYup = (mark) => {
  const y = mark.absolutePosition().y;
  if (y <= marksSpawnHeight + 8 + 15) mark.y(marksSpawnHeight + 8 + 15);
};

const restrictMovement = (mark) => {
  const markPosition = mark.absolutePosition();
  const x = markPosition.x;
  const y = markPosition.y;
  if (x <= 0) mark.x(0);
  else if (x >= backgroundWidth) mark.x(backgroundWidth);
  if (y >= backgroundHeight - 20) mark.y(backgroundHeight - 20);
  if (
    y >= marksSpawnHeight + 8 + 15 &&
    JSON.parse(localStorage.getItem(mark.name())).hitCoordArea === "false"
  ) {
    localStorage.setItem(
      mark.name(),
      JSON.stringify({
        hitCoordArea: "true",
      })
    );
    mark.on("dragmove", () => restrictMovementYup(mark));
  }
};

const getMarkRadius = () => {
  if (window.screen.width < 480) return 35;
  else if (window.screen.width < 768) return 30;
  else return 25;
};

const addMark = (id, interactiveLayer, x, y, color, name) => {
  // markWithText.addEventListener("dragend", (e) => {
  //   const coords = translateCoords(markWithText);
  //   document.getElementById("coordX").innerText = coords.x;
  //   document.getElementById("coordY").innerText = coords.y;
  // });

  const markRadius = getMarkRadius();
  const markAngle = 60;
  const markRotation = -1 * (90 + markAngle / 2);

  const mark = new Konva.Wedge({
    id: id,
    name: name,
    x: x,
    y: y,
    radius: markRadius,
    angle: markAngle,
    fill: color,
    rotation: markRotation,
    draggable: true,
  });
  localStorage.setItem(
    name,
    JSON.stringify({
      hitCoordArea: "false",
    })
  );

  mark.on("dragmove", () => restrictMovement(mark));

  interactiveLayer.add(mark);
};

const drawMarks = () => {
  const currentIndex = Number(localStorage.getItem("currentEventsIndex"));

  addMark(
    String(EVENTS[currentIndex].first.id),
    interactiveLayer,
    redMarkCoords.x,
    redMarkCoords.y,
    "#ff0000",
    "red"
  );

  addMark(
    String(EVENTS[currentIndex].second.id),
    interactiveLayer,
    blueMarkCoords.x,
    blueMarkCoords.y,
    "#0000ff",
    "blue"
  );

  interactiveLayer.draw();
};

// получает значения выбранных кнопок (radio buttons)
const getCheckedRadio = (name) => {
  const radioButtons = document.getElementsByName(name);
  let value = null;
  for (let i = 0; i < radioButtons.length; i++)
    if (radioButtons[i].checked) {
      value = radioButtons[i].value;
      break;
    }
  return value;
};

// получает сферы деятельности
const getActivities = () => {
  let activities = [];
  const activityItems = document.getElementsByClassName("activities-item");
  for (let i = 0; i < activityItems.length; i++) {
    const name = activityItems[i].children[1].children[0].name;
    const value = getCheckedRadio(name);
    activities.push({ name: value });
  }
  return activities;
};

const disablePlaceMarksButton = () => {
  const placeMarksButton = document.getElementById("place-marks");
  placeMarksButton.removeEventListener("click", placeMarks);
  placeMarksButton.remove();

  const eventsGroup = stage.findOne("#events");
  eventsGroup.destroy();
};

const showTooltip = (text, mark) => {
  tooltip.text(text);
  let x = mark.x() - tooltip.width() / 2;
  // проверка, не выходил ли текст подсказки за пределы поля с графиком
  if (x <= 0) {
    // если выходит слева, ставим подсказку правее метки
    tooltip.align("left");
    x = mark.x() + 15;
  } else if (x + tooltip.width() >= backgroundWidth) {
    // если справа - левее метки
    tooltip.align("right");
    x = mark.x() - tooltip.width() - 15;
  } else tooltip.align(TOOLTIP_TEXT_ALIGN);
  const y = mark.y() - mark.height() / 2 - tooltip.height();
  tooltip.x(x);
  tooltip.y(y);
  tooltip.show();
};

const hideTooltip = () => {
  tooltip.hide();
};

const placeMarks = () => {
  if (!marksSpawnArea) return;

  const currentIndex = Number(localStorage.getItem("currentEventsIndex"));

  const firstMark = stage.findOne("#" + EVENTS[currentIndex].first.id);
  const secondMark = stage.findOne("#" + EVENTS[currentIndex].second.id);
  const firstMarkY = firstMark.absolutePosition().y;
  const secondMarkY = secondMark.absolutePosition().y;
  const firstEvent = stage.findOne("#first-event");
  const secondEvent = stage.findOne("#second-event");

  if (firstMarkY < marksSpawnHeight || secondMarkY < marksSpawnHeight) {
    alert(ALERT_TEXT_MARKS_NOT_IN_AREA);
    return;
  }

  firstMark.draggable(false);
  firstMark.fill("#787878");
  const firstEventText = firstEvent.text();

  // показывает подсказку при наведении мыши на метку
  firstMark.on("mouseenter", () => showTooltip(firstEventText, firstMark));
  firstMark.on("mouseout", () => hideTooltip());

  // показывает подсказку при нажатии на метку со смартфона
  firstMark.on("touchstart", () => showTooltip(firstEventText, firstMark));
  firstMark.on("touchend", () => hideTooltip());

  secondMark.draggable(false);
  secondMark.fill("#787878");
  const secondEventText = secondEvent.text();

  // показывает подсказку при наведении мыши на метку
  secondMark.on("mouseenter", () => showTooltip(secondEventText, secondMark));
  secondMark.on("mouseout", () => hideTooltip());

  // показывает подсказку при нажатии на метку со смартфона
  secondMark.on("touchstart", () => showTooltip(secondEventText, secondMark));
  secondMark.on("touchend", () => hideTooltip());

  try {
    const newIndex = currentIndex + 1;

    if (newIndex >= EVENTS.length) {
      disablePlaceMarksButton();
      return;
    }

    firstEvent.text(EVENTS[newIndex].first.name);
    secondEvent.text(EVENTS[newIndex].second.name);

    localStorage.setItem("currentEventsIndex", newIndex);
    drawMarks();
  } catch (e) {
    if (e instanceof TypeError) alert(ALERT_TEXT_OUT_OF_EVENTS);
    else alert(ALERT_TEXT_UNKNOWN);
  }
};

// отправляет результаты опроса на сервер
const submitAnswers = () => {
  const gender = getCheckedRadio("gender");
  const yearOfBirth = document.getElementById("year-of-birth").value;
  const permKraiLiving = getCheckedRadio("perm-krai-living");
  const education = document.getElementById("education").value;
  const profession = document.getElementById("profession").value;
  const activites = getActivities();

  const data = {
    Gender: gender,
    Year: yearOfBirth,
    PremKrai: permKraiLiving,
    Education: education,
    Profession: profession,
    Activities: activites,
  };

  console.log(data);
};

const createTooltip = () => {
  tooltip = new Konva.Text({
    id: TOOLTIP_ID,
    visible: false,
    x: 0,
    y: 0,
    width: TOOLTIP_WIDTH,
    align: TOOLTIP_TEXT_ALIGN,
    fill: COLORS.text,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE_LARGE,
    text: "",
    strokeWidth: TOOLTIP_STROKE_WIDTH,
    stroke: COLORS.tooltip,
    fillAfterStrokeEnabled: true,
  });
  return tooltip;
};

const changeMarkRadius = (id, newRadius) => {
  const mark = stage.findOne("#" + id);
  mark.radius(newRadius);
};

const changeMarksRadius = () => {
  const newRadius = getMarkRadius();
  const currentIndex = Number(localStorage.getItem("currentEventsIndex"));
  for (let i = 0; i <= currentIndex; i++) {
    const firstMarkId = String(EVENTS[i].first.id);
    changeMarkRadius(firstMarkId, newRadius);
    const secondMarkId = String(EVENTS[i].second.id);
    changeMarkRadius(secondMarkId, newRadius);
  }
};

window.addEventListener("load", () => {
  const collectiveMemoryQuestionnaire = document.getElementById(
    "collective-memory-questionnaire"
  );
  backgroundWidth = collectiveMemoryQuestionnaire.offsetWidth;
  backgroundHeight = collectiveMemoryQuestionnaire.offsetHeight;

  stage = new Konva.Stage({
    container: "collective-memory-questionnaire",
    width: backgroundWidth,
    height: backgroundHeight,
  });

  drawBackground(stage);

  tooltip = createTooltip();
  tooltipLayer.add(tooltip);

  stage.add(interactiveLayer);
  stage.add(tooltipLayer);

  drawMarks();

  const placeMarksButton = document.getElementById("place-marks");
  placeMarksButton.addEventListener("click", placeMarks);

  const submit = document.getElementById("submit");
  submit.addEventListener("click", submitAnswers);

  window.addEventListener("resize", changeMarksRadius);
});
