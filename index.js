const backgroundWidth = 500;
const backgroundHeight = 300;

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
  const coordLineY = createCoordLine(
    backgroundWidth / 2,
    backgroundHeight,
    0,
    -1 * (backgroundHeight - pointerLength / 2),
    pointerLength
  );

  background.add(coordLineX);
  background.add(coordLineY);
};

// создаёт текст на оси Y
const addCoordText = (background) => {
  // общие значения
  const fontSize = 16;
  const textColor = "#000000";
  const leftTextContent = "Прошлое";
  const rightTextContent = "Настоящее";
  const fontFamily = "Calibri";

  // координаты начала текстов
  const leftX = 0;
  const leftY = backgroundHeight / 2 - fontSize * 2;
  const rightX = backgroundWidth - rightTextContent.length * (fontSize / 1.8);
  const rightY = backgroundHeight / 2 - fontSize * 2;

  const leftText = new Konva.Text({
    x: leftX,
    y: leftY,
    text: leftTextContent,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fill: textColor,
  });

  const rightText = new Konva.Text({
    x: rightX,
    y: rightY,
    text: rightTextContent,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fill: textColor,
  });

  background.add(leftText);
  background.add(rightText);
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
  const background = new Konva.Layer();

  addBackgroundColor(background, "#c2c0ba30");
  addCoordLines(background, stage);
  addCoordText(background, stage);

  stage.add(background);
  background.draw();
};

window.addEventListener("load", () => {
  const stage = new Konva.Stage({
    container: "questionnaire",
    width: backgroundWidth,
    height: backgroundHeight,
  });

  drawBackground(stage);
});
