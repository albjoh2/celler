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
    r,
    g,
    b,
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
    this.r = r;
    this.g = g;
    this.b = b;
    this.color = `rgb(${r}, ${g}, ${b})`;
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
        if (food.radius < 1) food.radius += 0.0000002;
        if (food.radius < 2) food.radius += 0.00000002;
        if (food.radius < 3) food.radius += 0.000000005;
        food.radius += 0.0000000005;
      });

      if (this.x < x + this.radius && x - this.radius < this.x) {
        if (this.y < y + this.radius && y - this.radius < this.y) {
          if (foods[food].radius >= 0.1) {
            foods[food].radius -= 0.005;
          }
          if (this.energi >= 1000) {
            this.celldelningsProgress += this.delningsEffektivitet * radius;
          } else if (foods[food].radius > 1.1)
            this.energi += this.energiUpptagning * radius - 0.13;
        }
      }
    }

    if (this.celldelningsProgress > 1000) {
      nrOfChildrenCells += 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      this.children++;
      const newID = `${this.id}-${this.children}`;
      cells.push(
        new Cell(
          newID,
          0,
          this.x,
          this.y,
          this.radius * (Math.random() * (0.95 - 1.05) + 1.05),
          this.r * (Math.random() * (0.96 - 1.04) + 1.04),
          this.g * (Math.random() * (0.96 - 1.04) + 1.04),
          this.b * (Math.random() * (0.96 - 1.04) + 1.04),
          500,
          0,
          this.hastighet,
          this.jumpLength * (Math.random() * (0.95 - 1.05) + 1.05),
          this.energiUpptagning * (Math.random() * (0.95 - 1.05) + 1.05),
          this.delningsEffektivitet * (Math.random() * (0.95 - 1.05) + 1.05)
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
      console.log(cells);
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

const cell = new Cell("1", 0, 400, 200, 20, 125, 125, 125, 500, 0, 1, 1, 1, 3);

let cells = [cell];
const foods = [];

for (let food in foodlist) {
  const { x, y, radius } = foodlist[food];
  foods[food] = new Food(x, y, radius, "lightgreen");
}

function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const animationID = requestAnimationFrame(animate);
  cells.forEach((cell) => cell.update());
  foods.forEach((food) => food.draw());
  if (cells.length > 99) {
    c.clearRect(0, 0, innerWidth, innerHeight);
    let x = 0;
    let y = 0;
    for (Cell in cells) {
      if (Cell % 15 === 0) {
        y += 40;
        x = 0;
      }
      x += 40;
      cells[Cell].x = x;
      cells[Cell].y = y;

      cells[Cell].energi = 0;
      cells[Cell].celldelningsProgress = 0;
      cells[Cell].draw();
    }
    cancelAnimationFrame(animationID);
  }
}

animate();
