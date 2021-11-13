let backgroundWidth = BACKGROUND_WIDTH_INITIAL;
let backgroundHeight = BACKGROUND_HEIGHT_INITIAL;
let marksSpawnHeight = BACKGROUND_HEIGHT_INITIAL / 5;

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

const textContent = "Какое-то шикарное и длинное событие";

const createMarksSpawnEvent = (staticMarkColor, marksSpawnAreaWidth) => {
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
    x: textX,
    y: textY,
    text: textContent,
    fontSize: FONT_SIZE_LARGE,
    width: textWidth,
    fontFamily: FONT_FAMILY,
    fill: TEXT_COLOR,
  });
  text.offsetY(text.fontSize() / 2 - radius / 2);

  if (staticMarkColor === "#ff0000") {
    eventOffsetX = textWidth + 20;
    redMarkCoords.x = marksSpawnAreaWidth / 2 - eventOffsetX + radius;
    redMarkCoords.y = marksSpawnHeight / 2 + 4 * radius;
  } else {
    eventOffsetX = -20;
    blueMarkCoords.x = marksSpawnAreaWidth / 2 + 20 + radius;
    blueMarkCoords.y = marksSpawnHeight / 2 + 4 * radius;
  }
  event.offsetX(eventOffsetX);

  event.add(staticMark);
  event.add(text);
  return event;
};

const createMarksSpawnEvents = (marksSpawnAreaWidth) => {
  const events = new Konva.Group({
    x: 0,
    y: marksSpawnHeight / 2,
  });
  const redEvent = createMarksSpawnEvent(COLORS.red, marksSpawnAreaWidth);
  const blueEvent = createMarksSpawnEvent(COLORS.blue, marksSpawnAreaWidth);
  events.add(redEvent);
  events.add(blueEvent);
  return events;
};

const createMarksSpawnText = () => {
  const x = 0;
  const y = 15;
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

  const marksSpawnArea = new Konva.Rect({
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

const addMark = (interactiveLayer, x, y, color) => {
  // markWithText.addEventListener("dragend", (e) => {
  //   const coords = translateCoords(markWithText);
  //   document.getElementById("coordX").innerText = coords.x;
  //   document.getElementById("coordY").innerText = coords.y;
  // });

  const markRadius = 25;
  const markAngle = 60;
  const markRotation = -1 * (90 + markAngle / 2);

  const mark = new Konva.Wedge({
    x: x,
    y: y,
    radius: markRadius,
    angle: markAngle,
    fill: color,
    rotation: markRotation,
    draggable: true
  });

  interactiveLayer.add(mark);
};

const drawMarks = (stage) => {
  const interactiveLayer = new Konva.Layer();
  stage.add(interactiveLayer);

  addMark(
    interactiveLayer,
    redMarkCoords.x,
    redMarkCoords.y,
    "#ff0000"
  );

  addMark(
    interactiveLayer,
    blueMarkCoords.x,
    blueMarkCoords.y,
    "#0000ff"
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

  const stage = new Konva.Stage({
    container: "collective-memory-questionnaire",
    width: backgroundWidth,
    height: backgroundHeight,
  });

  drawBackground(stage);
  drawMarks(stage);

  const submit = document.getElementById("submit");
  submit.addEventListener("click", submitAnswers);
});
