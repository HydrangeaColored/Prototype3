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
const goldImg = new Image();
goldImg.src = "gold.png";
const bottleImg = new Image();
bottleImg.src = "bottle.png";
const knifeImg = new Image();
knifeImg.src = "knife.png";
const ringImg = new Image();
ringImg.src = "ring.png";
const teddyImg = new Image();
teddyImg.src = "teddy.png";
const merchantImg = new Image();
merchantImg.src = "merchant.png";
const ghostImg = new Image();
ghostImg.src = "ghost.png";
const graveImg = new Image();
graveImg.src = "grave.png";
const playerImg = new Image();
playerImg.src = "player.png";
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
  drawItem() {
    if (this.hasItem != 0) {
      switch (this.hasItem) {
        case 1: // BOTTLE
          context.drawImage(bottleImg, 0, 0);
          break;
        case 2: // KNIFE
          context.drawImage(knifeImg, 0, 0);
          break;
        case 3: // RING
          context.drawImage(ringImg, 0, 0);
          break;
        case 4: // TEDDY
          context.drawImage(teddyImg, 0, 0);
          break;
        case 5: // GOLD
          context.drawImage(goldImg, 0, 0);
      }
    }
  }
}

class Merchant {
  posX: number;
  posY: number;
  item: number;
  constructor() {
    this.posX = 610;
    this.posY = 580;
    this.item = 0;
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
      console.log(`Gave ${thisPlayer.hasItem}`);
      this.item = thisPlayer.hasItem;
      thisPlayer.hasItem = 0;
    }
  }
  revealSecret() {
    if (this.item != 0) {
      let text;
      switch (this.item) {
        case 1: // BOTTLE
          text =
            "Ah, a pristine single malt scotch! Michael's favorite. He always seemed to have a bottle in his hand. Say, did you find the knife that stabbed him?";
          break;
        case 2: // KNIFE
          text =
            "Seems you found Luke's grave. He disappeared after his sister's death. Don't remember him well, but he never drank not even at his sister's funeral...";
          break;
        case 3: // RING
          text =
            "Kat's ring, a faded symbol of Kat's marriage. An unfortunate death due to complications during childbirth. Michael never seemed to quite recover...";
          break;
        case 4: // TEDDY
          text =
            "Ah, Susan loved this bear, a present from her brother and a memento of her late mom. Vanished at a young age, poor girl. It smells slightly like vanilla and booze??";
          break;
        case 5: // GOLD
          text = "Ooh shiny! A tidy sum of 100 coins.";
      }
      context.fillStyle = "black";
      context.font = "20px bold Arial";
      context.fillText(`${text}`, 20, canvas.height - 50, 1200);
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
  item: number;
  constructor(x: number, y: number, item: number) {
    this.posX = x;
    this.posY = y;
    this.item = item;
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
      thisPlayer.hasItem == 0 &&
      this.item != 0
    ) {
      thisPlayer.hasItem = this.item;
      console.log(`Player has item ${this.item}`);
      this.item = 0;
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
    currPlayer.drawItem();
    currMerchant.update();
    currMerchant.playerCheck(currPlayer);
    currMerchant.revealSecret();
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
const itemGraves = new Array();

for (let i = 0; i < 4; i++) {
  const grave = Math.floor(Math.random() * 8) + 1;
  if (itemGraves.indexOf(grave) != -1) {
    i = i - 1;
  } else {
    itemGraves.push(grave);
  }
}

const allGraves: Grave[] = [];
for (let i = 0; i < 4; i++) {
  if (itemGraves.indexOf(i + 1) == -1) {
    const currGrave = new Grave(GravePadding + i * 270, 150, 5);
    allGraves.push(currGrave);
  } else {
    const currGrave = new Grave(
      GravePadding + i * 270,
      150,
      itemGraves.indexOf(i + 1) + 1,
    );
    allGraves.push(currGrave);
  }
}
for (let i = 0; i < 4; i++) {
  if (itemGraves.indexOf(i + 5) == -1) {
    const currGrave = new Grave(GravePadding + i * 270, 300, 5);
    allGraves.push(currGrave);
  } else {
    const currGrave = new Grave(
      GravePadding + i * 270,
      300,
      itemGraves.indexOf(i + 5) + 1,
    );
    allGraves.push(currGrave);
  }
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
