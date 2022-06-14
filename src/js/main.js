import "../scss/main.scss";
import { genereraMat } from "./object-creators/food-creator";
import Controls from "./controls";

const canvas = document.querySelector(".plan");

canvas.width = 702;
canvas.height = 425;

const c = canvas.getContext("2d");

document.querySelector(".cells").textContent = 1;

const foodlist = genereraMat(c);

class Cell {
  constructor(
    id,
    children,
    x,
    y,
    maxSpeed,
    speed,
    acceleration,
    orientation,
    radius,
    r,
    g,
    b,
    o,
    energi,
    celldelningsProgress,
    jumpLength,
    energiUpptagning,
    delningsEffektivitet
  ) {
    this.id = id;
    this.children = children;
    this.x = x;
    this.y = y;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.orientation = orientation;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.o = o;
    this.color = `rgba(${r},${g},${b},${o})`;
    this.energi = energi;
    this.celldelningsProgress = celldelningsProgress;
    this.jumpLength = jumpLength;
    this.energiUpptagning = energiUpptagning;
    this.delningsEffektivitet = delningsEffektivitet;

    // this.speed = 0;
    this.speed = speed;

    this.dead = false;
    this.controls = new Controls();
  }

  draw() {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(-this.orientation);
    c.beginPath();
    c.arc(0, 0, this.radius, 0, Math.PI * 2, false);

    if (!this.dead) {
      if (this.children > 0) {
        c.strokeStyle = "black";
      } else c.strokeStyle = "green";
    } else {
      if (this.children === 0) {
        c.strokeStyle = "red";
      } else c.strokeStyle = "yellow";
    }
    c.stroke();

    c.fillStyle = this.color;
    c.fill();

    c.beginPath();
    c.fillStyle = "#3df322";
    c.fillRect(
      -this.radius,
      +this.radius * 1.5,
      ((this.radius * 2) / 1000) * this.celldelningsProgress,
      3
    );

    c.fillStyle = "#aaf322";
    c.fillRect(
      -this.radius,
      +this.radius * 1.1,
      ((this.radius * 2) / 1000) * this.energi,
      3
    );
    c.restore();
  }

  update() {
    this.#move();
    this.#jump();
    this.draw();

    if (this.energi >= 0) {
      this.energi -= 0.6;
    }
    if (this.celldelningsProgress >= 0) {
      this.celldelningsProgress -= 0.3;
    }
    for (let food in foods) {
      const { x, y, radius } = foods[food];

      if (this.x < x + this.radius && x - this.radius < this.x) {
        if (this.y < y + this.radius && y - this.radius < this.y) {
          if (foods[food].radius >= 0.05) {
            foods[food].radius -= 0.005;
          }
          if (this.energi >= 1000) {
            this.celldelningsProgress +=
              this.delningsEffektivitet * radius * 1.5;
          } else if (foods[food].radius > 1.1)
            this.energi += this.energiUpptagning * radius * 2;
        }
      }
    }

    if (this.celldelningsProgress > 1000) {
      this.children++;
      const newID = [...this.id, this.children];
      cells.push(
        new Cell(
          newID,
          0,
          this.x,
          this.y,
          this.maxSpeed * (Math.random() * (1.1 - 0.9) + 0.9),
          this.speed * (Math.random() * (1.1 - 0.9) + 0.9),
          this.acceleration * (Math.random() * (1.1 - 0.9) + 0.9),
          Math.random() * (10 - 0) + 0,
          this.radius * (Math.random() * (1.1 - 0.9) + 0.9),
          this.r * (Math.random() * (1.1 - 0.9) + 0.9),
          this.g * (Math.random() * (1.1 - 0.9) + 0.9),
          this.b * (Math.random() * (1.1 - 0.9) + 0.9),
          this.o * (Math.random() * (1.1 - 0.9) + 0.9),
          500,
          0,
          this.jumpLength * (Math.random() * (0.95 - 1.05) + 1.05),
          this.energiUpptagning * (Math.random() * (0.95 - 1.05) + 1.05),
          this.delningsEffektivitet * (Math.random() * (0.95 - 1.05) + 1.05)
        )
      );

      document.querySelector(".cells").textContent = cells.length;
      this.celldelningsProgress = 0;
      this.energi = 500;
    }

    if (this.energi <= 0) {
      this.dead = true;
      deadCells.push(this);
      let filteredArray = cells.filter((cell) => cell.id !== this.id);
      cells = filteredArray;
      document.querySelector(".cells").textContent = cells.length;
    }
  }

  #move() {
    if (this.x > 702 - this.radius) {
      this.orientation += 0.5;
    }

    if (this.x < 0 + this.radius) {
      this.orientation += 0.5;
    }

    if (this.y > 425 - this.radius) {
      this.orientation += 0.5;
    }

    if (this.y < 0 + this.radius) {
      this.orientation += 0.5;
    }

    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // if (this.speed > 0) {
    //   this.speed -= this.friction;
    // }
    // if (this.speed < 0) {
    //   this.speed += this.friction;
    // }
    // if (Math.abs(this.speed) < this.friction) {
    //   this.speed = 0;
    // }

    if (this.controls.left) {
      this.orientation += 0.03;
    }
    if (this.controls.right) {
      this.orientation -= 0.03;
    }

    console.log(this.speed);
    this.x -= Math.sin(this.orientation) * this.speed;
    this.y -= Math.cos(this.orientation) * this.speed;
  }

  #jump() {
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

const cell = new Cell(
  [1],
  0,
  400,
  200,
  1,
  0.49,
  0.1,
  0,
  10,
  125,
  125,
  125,
  0.5,
  500,
  0,
  1,
  1,
  1
);

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
  foods.forEach((food) => {
    if (food.radius < 1) food.radius += 0.0003;
    if (food.radius < 3) food.radius += 0.00003;
    if (food.radius < 5) food.radius += 0.0000008;
    if (food.radius < 7) food.radius += 0.000000008;
    food.radius += 0.0000000008;
  });
  let popRadius = 0;
  let popJump = 0;
  let popEnergiEff = 0;
  let popCelldelningsEff = 0;
  let statparagraph = "";
  for (Cell in cells) {
    statparagraph += `Radius: ${cells[Cell].radius.toFixed(2)} Wiggle: ${cells[
      Cell
    ].jumpLength.toFixed(2)}
    Energy-efficiency: ${cells[Cell].energiUpptagning.toFixed(2)}
    Breeding-efficiancy: ${cells[Cell].delningsEffektivitet.toFixed(
      2
    )} Speed: ${cells[Cell].speed.toFixed(2)}   `;

    popRadius += cells[Cell].radius / cells.length;
    popJump += cells[Cell].jumpLength / cells.length;
    popEnergiEff += cells[Cell].energiUpptagning / cells.length;
    popCelldelningsEff += cells[Cell].delningsEffektivitet / cells.length;
  }
  document.querySelector(".cell-statistik").textContent = statparagraph;
  let stats = `Alive: Size: ${popRadius.toFixed(
    2
  )} -- Movement: ${popJump.toFixed(
    2
  )} -- Energy efficiency: ${popEnergiEff.toFixed(
    2
  )} -- Breeding efficiency: ${popCelldelningsEff.toFixed(2)}`;
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
  let deadStats = `Dead: Size: ${deadPopRadius.toFixed(
    2
  )} -- Movement: ${deadPopJump.toFixed(
    2
  )} -- Energy efficiency: ${deadPopEnergiEff.toFixed(
    2
  )} -- Breeding efficiency: ${deadPopCelldelningsEff.toFixed(2)}`;
  document.querySelector(".dead-stats").textContent = deadStats;

  if (cells.length > 49 || cells.length === 0) {
    c.clearRect(0, 0, 702, 425);

    //Start of test
    let allCells = cells.concat(deadCells);

    allCells.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
    });
    allCells.sort((a, b) => {
      if (a.id.length < b.id.length) {
        return -1;
      }
      if (a.id.length > b.id.length) {
        return +1;
      }
    });

    let y = 30;
    let x = 0;
    let lastCellsGeneration = 0;
    let pappasGenerationsBarn = 1;
    let lastCellsPapi = 1;
    console.log(allCells);
    for (Cell in allCells) {
      let generation = allCells[Cell].id.length;
      allCells[Cell].radius *= 0.5;
      y = 15 * generation;
      x += 15;

      if (
        JSON.stringify(allCells[Cell].id.slice(0, -1)) !==
        JSON.stringify(lastCellsPapi)
      ) {
        x += 10;
      }

      if (lastCellsGeneration !== generation) {
        x = 702 / 2 - 15 * (pappasGenerationsBarn / 2) + 12.5;
        pappasGenerationsBarn = 0;
      }

      lastCellsPapi = allCells[Cell].id.slice(0, -1);
      pappasGenerationsBarn += allCells[Cell].children;
      lastCellsGeneration = generation;
      allCells[Cell].x = x;
      allCells[Cell].y = y;
      allCells[Cell].energi = 0;
      allCells[Cell].celldelningsProgress = 0;
      allCells[Cell].draw();
    }

    cancelAnimationFrame(animationID);
  }
}

animate();

//                             1
//   1,1         1,2          1,3        1,4           1,5
//  1,1,1   1,2,1   1,2,2               1,4,1  1,5,1  1,5,2  1,5,3

//1. se till att alla rader är centrerade horrisontelt genom att sätta x till mitten och subtrahera med bredden på halva nästa rad när det är generationsbyte - KLAR
//2. Se till att syskon hamnar närmare varandra än kusiner
//3. Se till att barnen hamnar under sina föräldrar
