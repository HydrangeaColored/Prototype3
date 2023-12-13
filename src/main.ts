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
const merchantImg = new Image();
merchantImg.src = "player.png";
const ghostImg = new Image();
ghostImg.src = "ghost.png";
const graveImg = new Image();
graveImg.src = "grave.png";
const playerSpd = 10;
const ghostSpd = 5;
const keysPressed: Set<string> = new Set();

class Player {
  posX: number;
  posY: number;
  isAlive: boolean;
  hasItem: number;
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.isAlive = true;
    this.hasItem = 0;
  }
  addPlayer() {
    playerImg.onload = () => this.update();
  }
  update() {
    context.drawImage(playerImg, this.posX, this.posY);
  }
}

class Merchant {
  posX: number;
  posY: number;
  constructor() {
    this.posX = 610;
    this.posY = 600;
  }
  addMerchant() {
    merchantImg.onload = () => this.update();
  }
  update() {
    context.drawImage(merchantImg, this.posX, this.posY);
  }
  playerCheck(thisPlayer: Player) {
    if (
      thisPlayer.posX >= this.posX - 30 &&
      thisPlayer.posX <= this.posX + 60 &&
      thisPlayer.posY >= this.posY - 39 &&
      thisPlayer.posY <= this.posY + 65 &&
      thisPlayer.hasItem != 0
    ) {
      let text;
      // FLAVOR TEXT IS THE TEXT BELOW FOR EACH ITEM!
      switch (thisPlayer.hasItem) {
        case 1:
          text = "Gave item 1";
          break;
        case 2:
          text = "gave item 2";
          break;
        case 3:
          text = "gave item 3";
          break;
        case 4:
          text = "gave item 4";
      }
      context.fillStyle = "black";
      context.font = "64px bold Arial";
      context.fillText(
        `${text}`,
        (canvas.width - 300) / 2,
        (canvas.height - 60) / 2,
      );
      thisPlayer.hasItem = 0;
    }
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

class Grave {
  posX: number;
  posY: number;
  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }
  addGrave() {
    graveImg.onload = this.update;
  }
  update() {
    context.drawImage(graveImg, this.posX, this.posY);
  }
  playerCheck(thisPlayer: Player) {
    if (
      thisPlayer.posX >= this.posX + 100 &&
      thisPlayer.posX <= this.posX + 170 &&
      thisPlayer.posY >= this.posY + 50 &&
      thisPlayer.posY <= this.posY + 120 &&
      thisPlayer.hasItem == 0
    ) {
      thisPlayer.hasItem = Math.floor(Math.random() * 4) + 1;
    }
  }
}

function redrawCanvas() {
  if (currPlayer.isAlive) {
    context.fillStyle = "#FFE5B4";
    context.clearRect(canvasPos, canvasPos, canvas.width, canvas.height);
    context.fillRect(canvasPos, canvasPos, canvas.width, canvas.height);
    allGraves.forEach((currGrave) => {
      currGrave.update();
      currGrave.playerCheck(currPlayer);
    });
    currPlayer.update();
    currMerchant.update();
    currMerchant.playerCheck(currPlayer);
    allGhosts.forEach((currGhost) => {
      currGhost.update();
      currGhost.playerCheck(currPlayer);
    });
  }
}

const currPlayer = new Player();
const currMerchant = new Merchant();
currMerchant.addMerchant();
currPlayer.addPlayer();
const allGhosts: Ghost[] = [];
for (let i = 0; i < 4; i++) {
  const currGhost = new Ghost();
  allGhosts.push(currGhost);
}
allGhosts.forEach((currGhost) => {
  currGhost.addGhost();
});

const GravePadding = 100;
const allGraves: Grave[] = [];
for (let i = 0; i < 4; i++) {
  const currGrave = new Grave(GravePadding + i * 270, 150);
  allGraves.push(currGrave);
}
allGraves.forEach((currGrave) => {
  currGrave.addGrave();
});

for (let i = 0; i < 4; i++) {
  const currGrave = new Grave(GravePadding + i * 270, 300);
  allGraves.push(currGrave);
}
allGraves.forEach((currGrave) => {
  currGrave.addGrave();
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
