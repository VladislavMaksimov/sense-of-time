const backgroundWidth = 500;
const backgroundHeight = 300;

// переводит координаты из системы элемента canvas (считаются от левого верхнего угла) в нашу систему координат
const translateCoords = (shape) => {
  const canvasCoordX = shape.getAttr("x");
  const canvasCoordY = shape.getAttr("y");
  const ourCoordX = canvasCoordX - backgroundWidth / 2;
  const ourCoordY = backgroundHeight / 2 - canvasCoordY;
  return { x: ourCoordX, y: ourCoordY };
};

// создаёт ось
const createCoordLine = (x, y, endX, endY, pointerLength) => {
  const pointerWidth = 10;
  const color = "#000000";
  const strokeWidth = 4;
  const lineJoin = "miter";
  const lineCap = "butt";

  return new Konva.Arrow({
    x: x,
    y: y,
    points: [0, 0, endX, endY],
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
  const coordLineX = createCoordLine(
    0,
    backgroundHeight / 2,
    backgroundWidth - pointerLength / 2,
    0,
    pointerLength
  );
  const coordLineYup = createCoordLine(
    backgroundWidth / 2,
    backgroundHeight / 2,
    0,
    -1 * (backgroundHeight / 2 - pointerLength / 2),
    pointerLength
  );
  const coordLineYdown = createCoordLine(
    backgroundWidth / 2,
    backgroundHeight / 2,
    0,
    backgroundHeight / 2 - pointerLength / 2,
    pointerLength
  );
  background.add(coordLineX);
  background.add(coordLineYup);
  background.add(coordLineYdown);
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
  // return coordText;
};

// создаёт текст на оси Y
const addCoordTexts = (background) => {
  const fontSize = 16;

  const upTextContent = TEXT_SIGNIFICANT;
  const rightTextContent = TEXT_PRESENT;
  const downTextContent = TEXT_UNSIGNIFICANT;
  const leftTextContent = TEXT_PAST;

  // координаты начала текстов
  const upX = backgroundWidth / 2;
  const upY = 0;
  const rightX = backgroundWidth;
  const rightY = backgroundHeight / 2;
  const downX = backgroundWidth / 2;
  const downY = backgroundHeight;
  const leftX = 0;
  const leftY = backgroundHeight / 2;

  // создание текстов
  const upText = createCoordText(upTextContent, upX, upY, fontSize);
  const rightText = createCoordText(rightTextContent, rightX, rightY, fontSize);
  const downText = createCoordText(downTextContent, downX, downY, fontSize);
  const leftText = createCoordText(leftTextContent, leftX, leftY, fontSize);

  // сдвиг текстов вверх/вниз и вправо/влево
  upText.offsetX(-15);
  upText.offsetY(-5);
  rightText.offsetX(rightText.width() + 5);
  rightText.offsetY(rightText.height() + 10);
  downText.offsetX(-15);
  downText.offsetY(downText.height() + 5);
  leftText.offsetX(-5);
  leftText.offsetY(rightText.height() + 10);

  // добавление текстов на интерфейс
  background.add(upText);
  background.add(rightText);
  background.add(downText);
  background.add(leftText);
};

const addBackgroundColor = (background, color) => {
  var backgroundColor = new Konva.Rect({
    x: 0,
    y: 0,
    width: backgroundWidth,
    height: backgroundHeight,
    fill: color,
  });
  background.add(backgroundColor);
};

const drawBackground = (stage) => {
  const backgroundLayer = new Konva.Layer();

  addBackgroundColor(backgroundLayer, "#c2c0ba30");
  addCoordLines(backgroundLayer, stage);
  addCoordTexts(backgroundLayer, stage);

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
  const fontSize = 14;
  const textColor = "#000000";
  const fontFamily = "Calibri";
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

const addMark = (marksLayer, textContent) => {
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

  marksLayer.add(markWithText);
};

const drawMarks = (stage) => {
  const marksLayer = new Konva.Layer();
  stage.add(marksLayer);

  addMark(
    marksLayer,
    "Эвакуация Ленинградского академического театра оперы и балета"
  );

  marksLayer.draw();
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
