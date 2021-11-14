let stage = null;
let interactiveLayer = null;
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
    fill: TEXT_COLOR,
  });
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
    fill: TEXT_COLOR,
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
    fill: MARKS_SPAWN_BACKGROUND_COLOR,
    stroke: MARKS_SPAWN_STROKE_COLOR,
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

const addMark = (id, interactiveLayer, x, y, color, name) => {
  // markWithText.addEventListener("dragend", (e) => {
  //   const coords = translateCoords(markWithText);
  //   document.getElementById("coordX").innerText = coords.x;
  //   document.getElementById("coordY").innerText = coords.y;
  // });

  const markRadius = 25;
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

const placeMarks = () => {
  if (!marksSpawnArea) return;

  const currentIndex = Number(localStorage.getItem("currentEventsIndex"));
  
  const firstMarkY = stage
    .findOne("#" + EVENTS[currentIndex].first.id)
    .absolutePosition().y;
  const secondMarkY = stage
    .findOne("#" + EVENTS[currentIndex].second.id)
    .absolutePosition().y;
  if (firstMarkY < marksSpawnHeight || secondMarkY < marksSpawnHeight) {
    alert(ALERT_TEXT_MARKS_NOT_IN_AREA);
    return;
  }

  try {
    const newIndex = currentIndex + 1;

    if (newIndex >= EVENTS.length) {
      disablePlaceMarksButton();
      return;
    }

    stage.findOne("#first-event").text(EVENTS[newIndex].first.name);
    stage.findOne("#second-event").text(EVENTS[newIndex].second.name);

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

  interactiveLayer = new Konva.Layer();
  stage.add(interactiveLayer);

  drawMarks();

  const placeMarksButton = document.getElementById("place-marks");
  placeMarksButton.addEventListener("click", placeMarks);

  const submit = document.getElementById("submit");
  submit.addEventListener("click", submitAnswers);
});
