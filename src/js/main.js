import "../scss/main.scss";
import { genereraMat } from "./object-creators/food-creator";

const canvas = document.querySelector(".plan");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const c = canvas.getContext("2d");

let nrOfChildrenCells = 1;
document.querySelector(".cells").textContent = nrOfChildrenCells;

const foodlist = genereraMat(c);

class Cell {
  constructor(
    id,
    children,
    x,
    y,
    radius,
    color,
    energi,
    celldelningsProgress,
    hastighet,
    jumpLength,
    energiUpptagning,
    delningsEffektivitet
  ) {
    this.id = id;
    this.children = children;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.energi = energi;
    this.celldelningsProgress = celldelningsProgress;
    this.hastighet = hastighet;
    this.jumpLength = jumpLength;
    this.energiUpptagning = energiUpptagning;
    this.delningsEffektivitet = delningsEffektivitet;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    c.beginPath();
    c.fillStyle = "#3df322";
    c.fillRect(
      this.x - this.radius,
      this.y + this.radius * 1.5,
      ((this.radius * 2) / 1000) * this.celldelningsProgress,
      3
    );
    c.stroke();

    c.fillStyle = "#aaf322";
    c.fillRect(
      this.x - this.radius,
      this.y + this.radius * 1.1,
      ((this.radius * 2) / 1000) * this.energi,
      3
    );
  }

  update() {
    this.jump();
    this.draw();
    if (this.energi >= 0) {
      this.energi -= 0.3;
    }
    if (this.celldelningsProgress >= 0) {
      this.celldelningsProgress -= 0.2;
    }
    for (let food in foods) {
      const { x, y, radius } = foods[food];
      //TODO Gör maten mindre när man äter av den.
      foods.forEach((food) => {
        if (food.radius < 1) food.radius += 0.0000005;
        if (food.radius < 3) food.radius += 0.0000001;
        food.radius += 0.00000001;
      });

      if (this.x < x + this.radius && x - this.radius < this.x) {
        if (this.y < y + this.radius && y - this.radius < this.y) {
          if (foods[food].radius >= 0.1) {
            foods[food].radius -= 0.005;
          }
          if (this.energi >= 1000) {
            this.celldelningsProgress +=
              (this.delningsEffektivitet * radius) / 4;
          } else this.energi += (this.energiUpptagning * radius) / 4;
        }
      }
    }

    if (this.celldelningsProgress > 1000) {
      nrOfChildrenCells += 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      this.children++;
      const newID = `${this.id}${this.children}`;
      cells.push(
        new Cell(
          newID,
          0,
          this.x,
          this.y,
          this.radius,
          this.color,
          500,
          0,
          this.hastighet,
          this.jumpLength,
          this.energiUpptagning,
          this.delningsEffektivitet
        )
      );
      console.log(cells);
      this.celldelningsProgress = 0;
      this.energi = 500;
    }

    if (this.energi <= 0) {
      nrOfChildrenCells -= 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;

      let filteredArray = cells.filter((cell) => cell.id !== this.id);

      cells = filteredArray;
    }
  }

  jump() {
    const jumpY = Math.random();
    const jumpX = Math.random();
    if (jumpX > 0.6666) {
      if (this.x < window.innerWidth - this.radius) this.x += this.jumpLength;
    }
    if (jumpX < 0.3334) {
      if (this.x > 0 + this.radius) this.x -= this.jumpLength;
    }
    if (jumpY > 0.6666) {
      if (this.y < window.innerHeight - this.radius) this.y += this.jumpLength;
    }
    if (jumpY < 0.3334) {
      if (this.y > 0 + this.radius) this.y -= this.jumpLength;
    }
  }
}

class Food {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

const cell = new Cell("1", 0, 400, 200, 20, "#000000", 500, 0, 1, 1, 4, 10);

let cells = [cell];
const foods = [];

for (let food in foodlist) {
  const { x, y, radius } = foodlist[food];
  foods[food] = new Food(x, y, radius, "lightgreen");
}

function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);
  cells.forEach((cell) => cell.update());
  foods.forEach((food) => food.draw());
}

animate();
