import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
document.title = "Grave Digger";
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d")!;
canvas.width = 1280;
canvas.height = 780;
context.fillStyle = "#FFE5B4";
const canvasPos = 0;
context.fillRect(canvasPos, canvasPos, canvas.width, canvas.height);
app.append(canvas);
const playerImg = new Image();
playerImg.src = "player.png";
const playerSpd = 10;
const keysPressed: Set<string> = new Set();

class Player {
  posX: number;
  posY: number;
  isAlive: boolean;
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.isAlive = true;
  }
  addPlayer() {
    playerImg.onload = this.update;
  }
  update() {
    console.log("player y is: ", currPlayer.posY);
    console.log("player x is: ", currPlayer.posX);
    context.drawImage(playerImg, currPlayer.posX, currPlayer.posY);
  }
}

function redrawCanvas() {
  if (currPlayer.isAlive) {
    context.fillStyle = "#FFE5B4";
    context.clearRect(canvasPos, canvasPos, canvas.width, canvas.height);
    context.fillRect(canvasPos, canvasPos, canvas.width, canvas.height);
    currPlayer.update();
  }
}

const currPlayer = new Player();
currPlayer.addPlayer();

window.addEventListener("keydown", (e) => {
  keysPressed.add(e.key);
  keyActions();
});

window.addEventListener("keyup", (e) => {
  console.log("released keys: ", e.key);
  keysPressed.delete(e.key);
  keyActions();
});

function keyActions() {
  console.log("running");
  if (keysPressed.has("w")) {
    currPlayer.posY -= playerSpd;
    if (currPlayer.posY < 0) {
      currPlayer.posY = 0;
    }
  }
  if (keysPressed.has("a")) {
    console.log("a");
    currPlayer.posX -= playerSpd;
    if (currPlayer.posX < 0) {
      currPlayer.posX = 0;
    }
  }
  if (keysPressed.has("s")) {
    console.log("s");
    currPlayer.posY += playerSpd;
    if (currPlayer.posY > 740) {
      currPlayer.posY = 740;
    }
  }
  if (keysPressed.has("d")) {
    console.log("d");
    currPlayer.posX += playerSpd;
    if (currPlayer.posX > 1250) {
      currPlayer.posX = 1250;
    }
  }
  redrawCanvas();
}
