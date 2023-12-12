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
const ghostImg = new Image();
ghostImg.src = "ghost.png";
const playerSpd = 10;
const ghostSpd = 5;
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
    playerImg.onload = () => this.update();
  }
  update() {
    context.drawImage(playerImg, this.posX, this.posY);
  }
}

class Ghost {
  posX: number;
  posY: number;
  goingRight: boolean;
  goingUp: boolean;
  constructor() {
    this.posX = Math.floor(Math.random() * 1200) + 30;
    this.posY = Math.floor(Math.random() * 684) + 30;
    if (Math.floor(Math.random() * 2)) {
      this.goingRight = true;
    } else {
      this.goingRight = false;
    }
    if (Math.floor(Math.random() * 2)) {
      this.goingUp = true;
    } else {
      this.goingUp = false;
    }
  }
  addGhost() {
    ghostImg.onload = this.update;
  }
  update() {
    if (this.goingRight) {
      if (this.posX + ghostSpd >= 1230) {
        this.goingRight = false;
        this.posX -= ghostSpd;
      } else {
        this.posX += ghostSpd;
      }
    } else {
      if (this.posX - ghostSpd <= 0) {
        this.goingRight = true;
        this.posX += ghostSpd;
      } else {
        this.posX -= ghostSpd;
      }
    }
    if (this.goingUp) {
      if (this.posY - ghostSpd <= -10) {
        this.goingUp = false;
        this.posY += ghostSpd;
      } else {
        this.posY -= ghostSpd;
      }
    } else {
      if (this.posY + ghostSpd >= 720) {
        this.goingUp = true;
        this.posY -= ghostSpd;
      } else {
        this.posY += ghostSpd;
      }
    }
    context.drawImage(ghostImg, this.posX, this.posY);
  }
  playerCheck(thisPlayer: Player) {
    if (
      thisPlayer.posX >= this.posX - 30 &&
      thisPlayer.posX <= this.posX + 60 &&
      thisPlayer.posY >= this.posY - 39 &&
      thisPlayer.posY <= this.posY + 65
    ) {
      thisPlayer.isAlive = false;
      context.fillStyle = "black";
      context.font = "64px bold Arial";
      context.fillText(
        "Game Over",
        (canvas.width - 300) / 2,
        (canvas.height - 60) / 2,
      );
    }
  }
}

function redrawCanvas() {
  if (currPlayer.isAlive) {
    context.fillStyle = "#FFE5B4";
    context.clearRect(canvasPos, canvasPos, canvas.width, canvas.height);
    context.fillRect(canvasPos, canvasPos, canvas.width, canvas.height);
    currPlayer.update();
    allGhosts.forEach((currGhost) => {
      currGhost.update();
      currGhost.playerCheck(currPlayer);
    });
  }
}

const currPlayer = new Player();
currPlayer.addPlayer();
const allGhosts: Ghost[] = [];
for (let i = 0; i < 4; i++) {
  const currGhost = new Ghost();
  allGhosts.push(currGhost);
}
allGhosts.forEach((currGhost) => {
  currGhost.addGhost();
});

window.addEventListener("keydown", (e) => {
  keysPressed.add(e.key);
  //keyActions();
});

window.addEventListener("keyup", (e) => {
  keysPressed.delete(e.key);
  //keyActions();
});

window.requestAnimationFrame(keyActions);

function keyActions() {
  if (keysPressed.has("w")) {
    currPlayer.posY -= playerSpd;
    if (currPlayer.posY < 0) {
      currPlayer.posY = 0;
    }
  }
  if (keysPressed.has("a")) {
    currPlayer.posX -= playerSpd;
    if (currPlayer.posX < 0) {
      currPlayer.posX = 0;
    }
  }
  if (keysPressed.has("s")) {
    currPlayer.posY += playerSpd;
    if (currPlayer.posY > 740) {
      currPlayer.posY = 740;
    }
  }
  if (keysPressed.has("d")) {
    currPlayer.posX += playerSpd;
    if (currPlayer.posX > 1250) {
      currPlayer.posX = 1250;
    }
  }
  redrawCanvas();
  window.requestAnimationFrame(keyActions);
}
