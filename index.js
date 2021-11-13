let backgroundWidth = BACKGROUND_WIDTH_INITIAL;
let backgroundHeight = BACKGROUND_HEIGHT_INITIAL;
let marksSpawnHeight = BACKGROUND_HEIGHT_INITIAL / 5;

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
  text.offsetX(text.width() / 2)
  return text;
};

const drawMarksSpawn = (backgroundLayer) => {
  const marksSpawnWithText = new Konva.Group({
    x: backgroundWidth / 2,
    y: 0,
  });

  const marksSpawn = new Konva.Rect({
    width: backgroundWidth - 8,
    height: backgroundHeight / 5,
    fill: MARKS_SPAWN_BACKGROUND_COLOR,
    stroke: MARKS_SPAWN_STROKE_COLOR,
    strokeWidth: 4,
    cornerRadius: 10,
  });
  marksSpawn.offsetX(marksSpawn.width() / 2);
  marksSpawn.offsetY(-5);

  marksSpawnHeight = marksSpawn.height();

  const text = createMarksSpawnText(marksSpawn.width());
  marksSpawnWithText.add(marksSpawn);
  marksSpawnWithText.add(text);
  console.log(marksSpawnWithText)
  backgroundLayer.add(marksSpawnWithText);
};

const drawBackground = (stage) => {
  const backgroundLayer = new Konva.Layer();

  drawMarksSpawn(backgroundLayer);
  addCoordLines(backgroundLayer, stage);

  stage.add(backgroundLayer);
  backgroundLayer.draw();
};

const addMarkFigure = (markGroup) => {
  const markX = 0;
  const markY = 0;
  const markRadius = 20;
  const markAngle = 60;
  const markRotation = -1 * (90 + markAngle / 2);
  const markColor = "#ff0000";
  const markStrokeColor = "#000000";
  const markStrokeWidth = 2;

  const mark = new Konva.Wedge({
    x: markX,
    y: markY,
    radius: markRadius,
    angle: markAngle,
    fill: markColor,
    stroke: markStrokeColor,
    strokeWidth: markStrokeWidth,
    rotation: markRotation,
  });

  markGroup.add(mark);

  return markRadius;
};

const addMarkText = (markGroup, textContent, markRadius) => {
  const textX = -50;
  const fontSize = FONT_SIZE_SMALL;
  const textColor = TEXT_COLOR;
  const fontFamily = FONT_FAMILY;
  const textWidth = 100;
  const textAlign = "center";

  const text = new Konva.Text({
    x: textX,
    text: textContent,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fill: textColor,
    align: textAlign,
    width: textWidth,
  });
  // ставит текст над меткой
  text.setAttr("y", -1 * text.height() - markRadius);

  markGroup.add(text);
};

const addMark = (interactiveLayer, textContent) => {
  const markWithTextX = backgroundWidth - backgroundWidth / 5;
  const markWithTextY = backgroundHeight - backgroundHeight / 1.5;

  const markWithText = new Konva.Group({
    x: markWithTextX,
    y: markWithTextY,
    draggable: true,
  });

  const markRadius = addMarkFigure(markWithText);
  addMarkText(markWithText, textContent, markRadius);

  // markWithText.addEventListener("dragend", (e) => {
  //   const coords = translateCoords(markWithText);
  //   document.getElementById("coordX").innerText = coords.x;
  //   document.getElementById("coordY").innerText = coords.y;
  // });

  interactiveLayer.add(markWithText);
};

const drawMarks = (stage) => {
  const interactiveLayer = new Konva.Layer();
  stage.add(interactiveLayer);

  addMark(
    interactiveLayer,
    "Эвакуация Ленинградского академического театра оперы и балета"
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
