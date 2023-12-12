import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d")!;
canvas.width = 1280;
canvas.height = 780;
context.fillStyle = "#FFE5B4";
const canvasPos = 0;
context.fillRect(canvasPos, canvasPos, canvas.width, canvas.height);
app.append(canvas);
const playerImg = new Image();
playerImg.src = "./src/img/player.png";
const playerSpd = 10;

class Player {
  posX: number;
  posY: number;
  constructor() {
    this.posX = 0;
    this.posY = 0;
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
  context.fillStyle = "#FFE5B4";
  context.clearRect(canvasPos, canvasPos, canvas.width, canvas.height);
  context.fillRect(canvasPos, canvasPos, canvas.width, canvas.height);
  currPlayer.update();
}

const currPlayer = new Player();
currPlayer.addPlayer();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w": {
      console.log("w");
      currPlayer.posY -= playerSpd;
      if (currPlayer.posY < 0) {
        currPlayer.posY = 0;
      }
      break;
    }
    case "a": {
      console.log("a");
      currPlayer.posX -= playerSpd;
      if (currPlayer.posX < 0) {
        currPlayer.posX = 0;
      }
      break;
    }
    case "s": {
      console.log("s");
      currPlayer.posY += playerSpd;
      if (currPlayer.posY > 740) {
        currPlayer.posY = 740;
      }
      break;
    }
    case "d": {
      console.log("d");
      currPlayer.posX += playerSpd;
      if (currPlayer.posX > 1250) {
        currPlayer.posX = 1250;
      }
      break;
    }
    default: {
      console.log("default");
    }
  }
  redrawCanvas();
});
