import "../scss/main.scss";
import { genereraMat } from "./object-creators/food-creator";

const canvas = document.querySelector(".plan");

canvas.width = 702;
canvas.height = 425;

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
    this.color = `rgba(${r},${g},${b},0.4)`;
    this.energi = energi;
    this.celldelningsProgress = celldelningsProgress;
    this.hastighet = hastighet;
    this.jumpLength = jumpLength;
    this.energiUpptagning = energiUpptagning;
    this.delningsEffektivitet = delningsEffektivitet;
    this.dead = false;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    if (!this.dead) {
      c.strokestyle = "yellow";
      c.stroke();
      if (this.children === 0) {
        c.strokestyle = "red";
        c.stroke();
      }
    }

    c.beginPath();
    c.fillStyle = "#3df322";
    c.fillRect(
      this.x - this.radius,
      this.y + this.radius * 1.5,
      ((this.radius * 2) / 1000) * this.celldelningsProgress,
      3
    );

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
      this.energi -= 0.2;
    }
    if (this.celldelningsProgress >= 0) {
      this.celldelningsProgress -= 0.1;
    }
    for (let food in foods) {
      const { x, y, radius } = foods[food];
      //TODO Gör maten mindre när man äter av den.
      foods.forEach((food) => {
        if (food.radius < 0.5) food.radius += 0.0000005;
        if (food.radius < 1) food.radius += 0.00000005;
        if (food.radius < 2) food.radius += 0.000000005;
        if (food.radius < 3) food.radius += 0.000000005;
        food.radius += 0.000000005;
      });

      if (this.x < x + this.radius && x - this.radius < this.x) {
        if (this.y < y + this.radius && y - this.radius < this.y) {
          if (foods[food].radius >= 0.1) {
            foods[food].radius -= 0.01;
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
          this.r * (Math.random() * (0.95 - 1.05) + 1.05),
          this.g * (Math.random() * (0.95 - 1.05) + 1.05),
          this.b * (Math.random() * (0.95 - 1.05) + 1.05),
          500,
          0,
          this.hastighet,
          this.jumpLength * (Math.random() * (0.95 - 1.05) + 1.05),
          this.energiUpptagning * (Math.random() * (0.95 - 1.05) + 1.05),
          this.delningsEffektivitet * (Math.random() * (0.95 - 1.05) + 1.05)
        )
      );

      this.celldelningsProgress = 0;
      this.energi = 500;
    }

    if (this.energi <= 0) {
      this.dead = true;
      nrOfChildrenCells -= 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      deadCells.push(this);
      let filteredArray = cells.filter((cell) => cell.id !== this.id);

      cells = filteredArray;
    }
  }

  jump() {
    const jumpY = Math.random();
    const jumpX = Math.random();
    if (jumpX > 0.6666) {
      if (this.x < 702 - this.radius) this.x += this.jumpLength;
    }
    if (jumpX < 0.3334) {
      if (this.x > 0 + this.radius) this.x -= this.jumpLength;
    }
    if (jumpY > 0.6666) {
      if (this.y < 425 - this.radius) this.y += this.jumpLength;
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

const cell = new Cell("1", 0, 400, 200, 20, 125, 125, 125, 500, 0, 1, 1, 1, 1);

let cells = [cell];
let deadCells = [];
const foods = [];

for (let food in foodlist) {
  const { x, y, radius } = foodlist[food];
  foods[food] = new Food(x, y, radius, "darkgreen");
}

function animate() {
  c.clearRect(0, 0, 702, 425);
  const animationID = requestAnimationFrame(animate);
  cells.forEach((cell) => cell.update());
  foods.forEach((food) => food.draw());
  let popRadius = 0;
  let popJump = 0;
  let popEnergiEff = 0;
  let popCelldelningsEff = 0;
  let statparagraph = "";
  for (Cell in cells) {
    statparagraph += `Radius: ${cells[Cell].radius.toFixed(
      2
    )} Movement: ${cells[Cell].jumpLength.toFixed(2)}
    Energy-efficiency: ${cells[Cell].energiUpptagning.toFixed(2)}
    Breeding-efficiancy: ${cells[Cell].delningsEffektivitet.toFixed(2)}   `;

    popRadius += cells[Cell].radius / cells.length;
    popJump += cells[Cell].jumpLength / cells.length;
    popEnergiEff += cells[Cell].energiUpptagning / cells.length;
    popCelldelningsEff += cells[Cell].delningsEffektivitet / cells.length;
  }
  document.querySelector(".cellinfo").textContent = statparagraph;
  let stats = `Lever: Storlek: ${popRadius.toFixed(
    2
  )}/20 -- Rörlighet: ${popJump.toFixed(
    2
  )}/1 -- Energieffektivitet: ${popEnergiEff.toFixed(
    2
  )}/1 -- Celldelningseffektivitet: ${popCelldelningsEff.toFixed(2)}/1`;
  document.querySelector(".stats").textContent = stats;

  let deadPopRadius = 0;
  let deadPopJump = 0;
  let deadPopEnergiEff = 0;
  let deadPopCelldelningsEff = 0;
  for (Cell in deadCells) {
    deadPopRadius += deadCells[Cell].radius / deadCells.length;
    deadPopJump += deadCells[Cell].jumpLength / deadCells.length;
    deadPopEnergiEff += deadCells[Cell].energiUpptagning / deadCells.length;
    deadPopCelldelningsEff +=
      deadCells[Cell].delningsEffektivitet / deadCells.length;
  }
  let deadStats = `Döda: Storlek: ${deadPopRadius.toFixed(
    2
  )}/20 -- Rörlighet: ${deadPopJump.toFixed(
    2
  )}/1 -- Energieffektivitet: ${deadPopEnergiEff.toFixed(
    2
  )}/1 -- Celldelningseffektivitet: ${deadPopCelldelningsEff.toFixed(2)}/1`;
  document.querySelector(".dead-stats").textContent = deadStats;

  if (cells.length > 99 || cells.length === 0) {
    c.clearRect(0, 0, 702, 425);

    let allCells = cells.concat(deadCells);

    allCells.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
    });
    allCells.sort((a, b) => {
      if (a.id.split("-").length < b.id.split("-").length) {
        return -1;
      }
      if (a.id.split("-").length > b.id.split("-").length) {
        return +1;
      }
    });

    let lastGeneration = 0;
    let lastChildren = 0;
    let x = 702 / 2 - 22.5;
    let y = 30;

    for (Cell in allCells) {
      allCells[Cell].radius = allCells[Cell].radius * 0.3;
      let generation = allCells[Cell].id.split("-").length - 1;
      y = 15 * generation + 30;
      x += 15;

      if (generation !== lastGeneration) {
        x = 702 / 2 - 7.5 * lastChildren;
        lastGeneration = generation;
        lastChildren = 0;
      }
      lastChildren += allCells[Cell].children;
      allCells[Cell].x = x;
      allCells[Cell].y = y;
      allCells[Cell].energi = 0;
      allCells[Cell].celldelningsProgress = 0;
      allCells[Cell].draw();
    }

    // for (Cell in cells) {
    //   if (Cell % 15 === 0) {
    //     y += 40;
    //     x = 0;
    //   }
    //   x += 40;
    //   cells[Cell].x = x;
    //   cells[Cell].y = y;

    //   cells[Cell].energi = 0;
    //   cells[Cell].celldelningsProgress = 0;
    //   cells[Cell].draw();
    // }
    cancelAnimationFrame(animationID);
  }
}

animate();
