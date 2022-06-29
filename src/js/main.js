import "../scss/main.scss";
import { genereraMat } from "./object-creators/food-creator";
// import Controls from "./controls";
// import Sensor from "./sensor";

const canvas = document.querySelector(".plan");
const diagramCanvas = document.querySelector(".diagram");
diagramCanvas.width = 580;
diagramCanvas.height = 200;

canvas.width = 702;
canvas.height = 580;

const c = canvas.getContext("2d");
const dc = diagramCanvas.getContext("2d");

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
    r2,
    g2,
    b2,
    o2,
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
    this.r2 = r2;
    this.g2 = g2;
    this.b2 = b2;
    this.o2 = o2;
    this.color = `rgba(${r},${g},${b},${o})`;
    this.energi = energi;
    this.celldelningsProgress = celldelningsProgress;
    this.jumpLength = jumpLength;
    this.energiUpptagning = energiUpptagning;
    this.delningsEffektivitet = delningsEffektivitet;

    // this.speed = 0;
    this.speed = speed;

    this.dead = false;

    // this.sensor = new Sensor(this);
    // this.controls = new Controls();
  }

  draw() {
    if (cells.length < 100 && cells.length > 0) {
      c.save();
      c.translate(this.x, this.y);
      c.rotate(-this.orientation);
      c.beginPath();
      c.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      const grd = c.createRadialGradient(0, 0, 0, 0, 0, this.radius);
      grd.addColorStop(0, `rgba(${this.r},${this.g},${this.b},${this.o})`);
      grd.addColorStop(1, `rgba(${this.r2},${this.g2},${this.b2},${this.o2})`);

      if (this.dead) {
        c.strokeStyle = "black";
        c.stroke();
      }

      c.fillStyle = grd;
      c.fill();

      c.beginPath();
      c.fillStyle = "#3df322";
      c.fillRect(
        -this.radius,
        +this.radius * 1.5,
        ((this.radius * 2) / 1000) * this.celldelningsProgress,
        3
      );

      c.fillStyle = "blue";
      c.fillRect(
        -this.radius,
        +this.radius * 1.1,
        ((this.radius * 2) / 1000) * this.energi,
        3
      );
      c.restore();
      // this.sensor.draw(c);
    } else {
      c.beginPath();

      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      const grd = c.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );

      grd.addColorStop(0, `rgba(${this.r},${this.g},${this.b},${this.o})`);

      grd.addColorStop(1, `rgba(${this.r2},${this.g2},${this.b2},${this.o2})`);

      if (this.dead) {
        c.strokeStyle = "black";
        c.stroke();
      }

      c.fillStyle = grd;
      c.fill();
    }
  }

  update() {
    this.#move();
    // this.sensor.update(foods);

    this.#jump();
    this.draw();

    if (this.energi >= 0) {
      this.energi -=
        this.speed / 4 +
        Math.pow(this.jumpLength, 3) / 3 +
        Math.pow(this.radius, 2) / 8000 +
        0.5;
    }
    if (this.celldelningsProgress >= 0) {
      this.celldelningsProgress -=
        this.speed / 4 +
        Math.pow(this.jumpLength, 3) / 3 +
        Math.pow(this.radius, 3) / 2500 +
        0.5;
    }
    for (let food in foods) {
      const { x, y, radius } = foods[food];

      if (this.x < x + this.radius && x - this.radius < this.x) {
        if (this.y < y + this.radius && y - this.radius < this.y) {
          if (foods[food].radius >= 0.05) {
            foods[food].radius -= 0.005;
          }
          if (this.energi >= 1000) {
            this.celldelningsProgress += this.delningsEffektivitet * radius * 2;
          } else if (foods[food].radius > 1.1)
            this.energi += this.energiUpptagning * radius * 4;
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
          this.maxSpeed * (Math.random() * (1.2 - 0.8) + 0.8),
          this.speed * (Math.random() * (1.2 - 0.8) + 0.8),
          this.acceleration * (Math.random() * (1.2 - 0.8) + 0.8),
          Math.random() * 10 - 0,
          this.radius * (Math.random() * (1.1 - 0.9) + 0.9),
          this.r * (Math.random() * (1.2 - 0.8) + 0.8),
          this.g * (Math.random() * (1.2 - 0.8) + 0.8),
          this.b * (Math.random() * (1.2 - 0.8) + 0.8),
          this.o * (Math.random() * (1.2 - 0.8) + 0.8),
          this.r2 * (Math.random() * (1.2 - 0.8) + 0.8),
          this.g2 * (Math.random() * (1.2 - 0.8) + 0.8),
          this.b2 * (Math.random() * (1.2 - 0.8) + 0.8),
          this.o2 * (Math.random() * (1.2 - 0.8) + 0.8),
          500,
          0,
          this.jumpLength * (Math.random() * (1.2 - 0.8) + 0.8),
          this.energiUpptagning * (Math.random() * (1.2 - 0.8) + 0.8),
          this.delningsEffektivitet * (Math.random() * (1.2 - 0.8) + 0.8)
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
      this.orientation += 0.1;
    }

    if (this.x < 0 + this.radius) {
      this.orientation += 0.1;
    }

    if (this.y > 580 - this.radius) {
      this.orientation += 0.1;
    }

    if (this.y < 0 + this.radius) {
      this.orientation += 0.1;
    }

    // if (this.controls.forward) {
    //   this.speed += this.acceleration;
    // }
    // if (this.controls.reverse) {
    //   this.speed -= this.acceleration;
    // }

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

    // if (this.controls.left) {
    //   this.orientation += 0.03;
    // }
    // if (this.controls.right) {
    //   this.orientation -= 0.03;
    // }

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
      if (this.y < 580 - this.radius) this.y += this.jumpLength;
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

  // #createPolygon() {
  //   const points = [];
  //   const rad = Math.hypot(this.radius, this.radius);
  //   const alpha = Math.atan2(this.radius, this.height);
  //   points.push({
  //     x: this.x - Math.sin(-alpha) * rad,
  //     y: this.y - Math.cos(-alpha) * rad,
  //   });
  //   points.push({
  //     x: this.x - Math.sin(alpha) * rad,
  //     y: this.y - Math.cos(alpha) * rad,
  //   });
  //   points.push({
  //     x: this.x - Math.sin(Math.PI - alpha) * rad,
  //     y: this.y - Math.cos(Math.PI - alpha) * rad,
  //   });
  //   points.push({
  //     x: this.x - Math.sin(Math.PI + alpha) * rad,
  //     y: this.y - Math.cos(Math.PI + alpha) * rad,
  //   });
  //   return points;
  // }

  draw() {
    // this.polygon = this.#createPolygon();
    c.beginPath();
    // c.moveTo(this.polygon[0].x, this.polygon[0].y);
    // for (let i = 1; i < this.polygon.length; i++) {
    //   c.lineTo(this.polygon[i].x, this.polygon[i].y);
    // }
    // c.fill();
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
  0.09,
  0.1,
  0,
  10,
  100,
  100,
  100,
  0.5,
  100,
  100,
  100,
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

let cellLength = 1;
let diagramX = 0;
let prevYSize = diagramCanvas.height / 2 + 100 - Math.pow(10, 2);
let prevYFoodRadius = diagramCanvas.height / 2 + 128 - Math.pow(2, 6);
let prevYPopJump = diagramCanvas.height / 2 + 1 - Math.pow(1, 6);
let prevYPopEnergyEff = diagramCanvas.height / 2 + 1 - Math.pow(1, 6);
let prevYBreedingEff = diagramCanvas.height / 2 + 1 - Math.pow(1, 6);
let prevYSpeed = diagramCanvas.height / 2 - Math.pow(0.09, 6);

function animate() {
  c.clearRect(0, 0, 702, 580);

  const animationID = requestAnimationFrame(animate);
  foods.forEach((food) => food.draw());
  cells.forEach((cell) => cell.update());
  foods.forEach((food) => {
    if (food.radius < 1) food.radius += 0.0003;
    if (food.radius < 3) food.radius += 0.00001;
    if (food.radius < 5) food.radius += 0.000001;
    if (food.radius < 7) food.radius += 0.0000001;
    food.radius += 0.00000001;
  });

  if (cellLength !== cells.length) {
    cellLength = cells.length;
    let popRadius = 0;
    let popJump = 0;
    let popEnergiEff = 0;
    let popCelldelningsEff = 0;
    let popSpeed = 0;
    let statsParagraph = "";
    let statsRubriker =
      "Radius: \u00A0Wiggle: \u00A0Energy effectivity: \u00A0Breeding effectivity: \u00A0Speed: \u00A0Generation: ";
    achivementsToPrint = "";
    for (Cell in cells) {
      if (cells[Cell].id.length > 9) {
        Achivements.tenGenerations = true;
      }
      if (cells[Cell].id.length > 19) {
        Achivements.twentyGenerations = true;
      }
      if (cells[Cell].id.length > 49) {
        Achivements.fiftyGenerations = true;
      }
      if (cells[Cell].id.length > 79) {
        Achivements.eightyGenerations = true;
      }
      if (cells[Cell].id.length > 99) {
        Achivements.hundredGenerations = true;
      }
      if (cells[Cell].speed > 0.1) {
        Achivements.firstCellWalking = true;
      }
      if (cells[Cell].speed > 0.5) {
        Achivements.firstCellRunning = true;
      }
      if (cells[Cell].speed > 1) {
        Achivements.usainBolt = true;
      }
      if (cells[Cell].radius > 12) {
        Achivements.bigMamaIsHere = true;
      }
      if (cells[Cell].radius > 15) {
        Achivements.hugeMamaIsHere = true;
      }
      if (cells[Cell].children > 4) {
        Achivements.genghisKhan = true;
      }
      if (cells[Cell].jumpLength < 0.1) {
        Achivements.adhdFinnalyCured = true;
      }
      statsParagraph += `\u00A0${
        cells[Cell].radius < 10
          ? cells[Cell].radius.toFixed(3)
          : cells[Cell].radius.toFixed(2)
      }\u00A0\u00A0\u00A0\u00A0\u00A0 ${cells[Cell].jumpLength.toFixed(
        2
      )}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${cells[
        Cell
      ].energiUpptagning.toFixed(
        2
      )}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${cells[
        Cell
      ].delningsEffektivitet.toFixed(
        2
      )}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${cells[
        Cell
      ].speed.toFixed(3)}
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${
      cells[Cell].id.length
    }\u00A0\u00A0\u00A0\u00A0\u00A0 `;

      popRadius += cells[Cell].radius / cells.length;
      popJump += cells[Cell].jumpLength / cells.length;
      popEnergiEff += cells[Cell].energiUpptagning / cells.length;
      popCelldelningsEff += cells[Cell].delningsEffektivitet / cells.length;
      if (cells[Cell].speed > 0.01) {
        popSpeed += cells[Cell].speed / cells.length;
      }
    }
    let foodRadiusSnitt = 0;
    if (cells.length < 100) {
      foods.forEach((food, i) => {
        foodRadiusSnitt += foods[i].radius;
      });
    }
    foodRadiusSnitt /= 900;

    dc.beginPath();
    dc.moveTo(diagramX, prevYSize);
    dc.lineTo(
      diagramX + 1,
      diagramCanvas.height / 2 + 100 - Math.pow(popRadius, 2)
    );
    dc.strokeStyle = "red";
    dc.lineWidth = 1;
    dc.stroke();
    prevYSize = diagramCanvas.height / 2 + 100 - Math.pow(popRadius, 2);

    dc.beginPath();
    dc.moveTo(diagramX, prevYFoodRadius);
    dc.lineTo(
      diagramX + 1,
      diagramCanvas.height / 2 + 64 - Math.pow(foodRadiusSnitt, 6)
    );
    dc.strokeStyle = "green";
    dc.lineWidth = 1;
    dc.stroke();
    prevYFoodRadius =
      diagramCanvas.height / 2 + 64 - Math.pow(foodRadiusSnitt, 6);

    dc.beginPath();
    dc.moveTo(diagramX, prevYPopJump);
    dc.lineTo(
      diagramX + 1,
      diagramCanvas.height / 2 + 1 - Math.pow(popJump, 8)
    );
    dc.strokeStyle = "yellow";
    dc.lineWidth = 1;
    dc.stroke();
    prevYPopJump = diagramCanvas.height / 2 + 1 - Math.pow(popJump, 8);

    dc.beginPath();
    dc.moveTo(diagramX, prevYPopEnergyEff);
    dc.lineTo(
      diagramX + 1,
      diagramCanvas.height / 2 + 1 - Math.pow(popEnergiEff, 8)
    );
    dc.strokeStyle = "blue";
    dc.lineWidth = 1;
    dc.stroke();
    prevYPopEnergyEff =
      diagramCanvas.height / 2 + 1 - Math.pow(popEnergiEff, 8);

    dc.beginPath();
    dc.moveTo(diagramX, prevYBreedingEff);
    dc.lineTo(
      diagramX + 1,
      diagramCanvas.height / 2 + 1 - Math.pow(popCelldelningsEff, 8)
    );
    dc.strokeStyle = "lightgreen";
    dc.lineWidth = 1;
    dc.stroke();
    prevYBreedingEff =
      diagramCanvas.height / 2 + 1 - Math.pow(popCelldelningsEff, 8);

    dc.beginPath();
    dc.moveTo(diagramX, prevYSpeed);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 - Math.pow(popSpeed, 6));
    dc.strokeStyle = "black";
    dc.lineWidth = 1;
    dc.stroke();
    prevYSpeed = diagramCanvas.height / 2 - Math.pow(popSpeed, 12);
    diagramX += 0.25;

    document.querySelector(".cell-statistik").textContent =
      statsRubriker + statsParagraph;
    let stats = `Alive: Size: ${popRadius.toFixed(
      2
    )} -- Wiggle: ${popJump.toFixed(
      2
    )} -- Energy efficiency: ${popEnergiEff.toFixed(
      2
    )} -- Breeding efficiency: ${popCelldelningsEff.toFixed(
      2
    )} -- Speed: ${popSpeed.toFixed(2)}`;
    document.querySelector(".alive-stats").textContent = stats;

    let deadPopRadius = 0;
    let deadPopJump = 0;
    let deadPopEnergiEff = 0;
    let deadPopCelldelningsEff = 0;
    let deadPopSpeed = 0.0;
    for (Cell in deadCells) {
      deadPopRadius += deadCells[Cell].radius / deadCells.length;
      deadPopJump += deadCells[Cell].jumpLength / deadCells.length;
      deadPopEnergiEff += deadCells[Cell].energiUpptagning / deadCells.length;
      deadPopCelldelningsEff +=
        deadCells[Cell].delningsEffektivitet / deadCells.length;
      if (deadCells[Cell].speed > 0.01) {
        deadPopSpeed += deadCells[Cell].speed / deadCells.length;
      }
    }
    let deadStats = `Dead: Size: ${deadPopRadius.toFixed(
      2
    )} -- Wiggle: ${deadPopJump.toFixed(
      2
    )} -- Energy efficiency: ${deadPopEnergiEff.toFixed(
      2
    )} -- Breeding efficiency: ${deadPopCelldelningsEff.toFixed(
      2
    )} -- Speed: ${deadPopSpeed.toFixed(2)}`;
    document.querySelector(".dead-stats").textContent = deadStats;

    //When fist child have been born
    if (cells.length > 1) {
      Achivements.firstChild = true;
    }
    if (cells.length > 9) {
      Achivements.thisIsAGoodSim = true;
    }
    if (cells.length > 19) {
      Achivements.thisIsAGreateSim = true;
    }
    if (cells.length > 39) {
      Achivements.thisIsAFantasticSim = true;
    }
    if (cells.length > 59) {
      Achivements.thisIsAnAmazingSim = true;
    }
    if (cells.length > 79) {
      Achivements.thisIsAIncredibleSim = true;
    }
    if (cells.length > 99) {
      Achivements.winningRound = true;
    }
    if (cells.length + deadCells.length > 100) {
      Achivements.hundredCells = true;
    }
    if (cells.length + deadCells.length > 500) {
      Achivements.fiveHundredCells = true;
    }

    Object.keys(Achivements).forEach(
      (key) => (achivementsToPrint += `${key} ${Achivements[key]} `)
    );
    document.querySelector(".achivements").textContent = achivementsToPrint;

    if (cells.length > 99 || cells.length === 0) {
      canvas.height = 20000;

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
        y = 20 * generation;
        x += 15;

        if (
          JSON.stringify(allCells[Cell].id.slice(0, -1)) !==
          JSON.stringify(lastCellsPapi)
        ) {
          x += 10;
        }

        if (lastCellsGeneration !== generation) {
          x = 702 / 2 - 20 * (pappasGenerationsBarn / 2) + 12.5;
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
      for (let i = 0; i < allCells[allCells.length - 1].id.length + 1; i++) {
        for (Cell in allCells) {
          if (allCells[Cell].id.length === i) {
            let cellToGetParent = Cell;
            let parentCell = allCells[Cell].id.slice(0, -1);
            console.log(parentCell);
            for (Cell in allCells) {
              if (
                JSON.stringify(allCells[Cell].id) === JSON.stringify(parentCell)
              ) {
                c.beginPath();
                c.lineWidth = 0.5;
                c.strokeStyle = "black";
                c.moveTo(
                  allCells[Cell].x,
                  allCells[Cell].y + allCells[Cell].radius
                );
                c.lineTo(
                  allCells[cellToGetParent].x,
                  allCells[cellToGetParent].y - allCells[cellToGetParent].radius
                );
                c.stroke();
              }
            }
          }
        }
      }
      for (Cell in allCells) {
        allCells[Cell].draw();
      }
      cancelAnimationFrame(animationID);
    }
  }
}

//List of achevements
const Achivements = {
  //When fist child have been born
  firstChild: false,

  //When 10 cells on the plane
  thisIsAGoodSim: false,

  //When 20 cells on the plane
  thisIsAGreateSim: false,

  //When 40 cells on the plane
  thisIsAFantasticSim: false,

  //When 60 cells on the plane
  thisIsAnAmazingSim: false,

  //When 80 cells on the plane
  thisIsAIncredibleSim: false,

  //When 100 cells on the plane
  winningRound: false,

  //When 10 generations have been born
  tenGenerations: false,

  //When 20 generations have been born
  twentyGenerations: false,

  //When 50 generations have been born
  fiftyGenerations: false,

  //When 80 generations have been born
  eightyGenerations: false,

  //When 100 generations have been born
  hundredGenerations: false,

  //When a cell is faster than 0.1 speed
  firstCellWalking: false,

  //When a cell is faster than 0.5 speed
  firstCellRunning: false,

  //When a cell is faster than 0.5 speed
  usainBolt: false,

  //When a cell has been born with size >= 12
  bigMamaIsHere: false,

  //When a cell has been born with size >= 15
  hugeMamaIsHere: false,

  //When a cell has had > 5 children
  genghisKhan: false,

  //When a cell wiggle < 0.1
  adhdFinnalyCured: false,

  //When total nr of cells been alive >= 100
  hundredCells: false,

  //When total nr of cells been alive >= 500
  fiveHundredCells: false,
};
let achivementsToPrint = "";
Object.keys(Achivements).forEach(
  (key) => (achivementsToPrint += `${key} ${Achivements[key]} `)
);
document.querySelector(".achivements").textContent = achivementsToPrint;

document.querySelector(".cell-statistik").textContent =
  "Radius: \u00A0Wiggle: \u00A0Energy effectivity: \u00A0Breeding effectivity: \u00A0Speed: \u00A0Generation: \u00A010.00\u00A0\u00A0\u00A0\u00A0\u00A0 1.00\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 1.00\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 1.00\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 0.09\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A01\u00A0\u00A0\u00A0\u00A0\u00A0";

animate();

//                             1
//   1,1         1,2          1,3        1,4           1,5
//  1,1,1   1,2,1   1,2,2               1,4,1  1,5,1  1,5,2  1,5,3

//1. se till att alla rader är centrerade horrisontelt genom att sätta x till mitten och subtrahera med bredden på halva nästa rad när det är generationsbyte - KLAR
//2. Se till att syskon hamnar närmare varandra än kusiner
//3. Se till att barnen hamnar under sina föräldrar
