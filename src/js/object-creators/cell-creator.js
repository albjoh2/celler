export const genereraDinCell = (
  c,
  minCell,
  foodlist,
  nrOfChildrenCells,
  x = Math.random() * (window.innerWidth - 10 - minCell.diameter) +
    minCell.diameter,
  y = Math.random() * (window.innerHeight - 10 - minCell.diameter) +
    minCell.diameter
) => {
  class Cell {
    constructor(
      x,
      y,
      radius,
      color,
      energi,
      celldelningsProgress,
      hastighet,
      jumpLength
    ) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.energi = energi;
      this.celldelningsProgress = celldelningsProgress;
      this.hastighet = hastighet;
      this.jumpLength = jumpLength;
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
        this.energi -= 1;
      }
      if (this.celldelningsProgress >= 0) {
        this.celldelningsProgress -= 0.2;
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
        if (this.y < window.innerHeight - this.radius)
          this.y += this.jumpLength;
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

  const food = new Food(30, 10, 10, "lightgreen");
  const cell = new Cell(10, 30, 10, "#000000", 1000, 1000, 1, 1);

  const cells = [cell];

  const { diameter, hastighet, energi, matTillCelldelning } = minCell;

  c.beginPath();
  c.arc(
    x - diameter / 2,
    y - diameter / 2,
    diameter / 2,
    0,
    Math.PI * 2,
    false
  );
  c.strokeStyle = "#000";
  c.stroke();

  c.fillRect(x, y, 100, 10);

  let animateX = x;
  let animateY = y;

  let rundansEnergi = energi;
  let rundansMatTillCelldelning = matTillCelldelning;

  function animateFood() {
    requestAnimationFrame(animateFood);
    cells.forEach((cell) => cell.update());
    food.draw();

    if (rundansEnergi >= 0) {
      rundansEnergi -= 1;
    }
    if (rundansMatTillCelldelning >= 0) {
      rundansMatTillCelldelning -= 0.2;
    }

    for (let food in foodlist) {
      const { x, y, diameter } = foodlist[food];
      c.beginPath();
      c.arc(x, y, diameter, 0, Math.PI * 2, false);
      c.strokeStyle = "#44af2a";
      c.fillStyle = "#44af2a";
      c.fill();
      c.stroke();
      if (animateX - minCell.diameter < x && x < animateX) {
        if (animateY - minCell.diameter < y && y < animateY) {
          if (rundansEnergi >= 1000) {
            rundansMatTillCelldelning++;
          } else rundansEnergi += 2;
        }
      }
    }

    if (rundansMatTillCelldelning > 1000) {
      nrOfChildrenCells += 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      genereraDinCell(
        c,
        minCell,
        foodlist,
        nrOfChildrenCells,
        animateX,
        animateY
      );
      rundansMatTillCelldelning = 0;
      rundansEnergi = 500;
    }
  }
  animateFood();

  function animate() {
    const id = requestAnimationFrame(animate);
    if (rundansEnergi <= 0) {
      nrOfChildrenCells -= 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      cancelAnimationFrame(id);
    }

    c.beginPath();
    c.arc(
      animateX - diameter / 2,
      animateY - diameter / 2,
      diameter / 2,
      0,
      Math.PI * 2,
      false
    );
    c.fillStyle = "#000";
    c.fill();
    c.strokeStyle = "#000";
    c.stroke();

    c.beginPath();
    c.fillStyle = "#3df322";
    c.fillRect(
      animateX - diameter,
      animateY + diameter / 4,
      (diameter / 1000) * rundansMatTillCelldelning,
      3
    );
    c.stroke();

    c.fillStyle = "#aaf322";
    c.fillRect(
      animateX - diameter,
      animateY + diameter / 6,
      (diameter / 1000) * rundansEnergi,
      3
    );

    const directionY = Math.random();
    if (directionY > 0.6666) {
      if (animateY < window.innerHeight - diameter) animateY += hastighet;
    }
    if (directionY < 0.3334) {
      if (animateY > 0 + diameter) animateY -= hastighet;
    }
    const directionX = Math.random();
    if (directionX > 0.6666) {
      if (animateX < window.innerWidth - diameter) animateX += hastighet;
    }
    if (directionX < 0.3334) {
      if (animateX > 0 + diameter) animateX -= hastighet;
    }
  }
  animate();
};

// export const genereraMotståndarCell = (c, stateOfGame) => {
//   const { svårighetsgrad } = stateOfGame;
//   const diameter = (Math.random() * (50 - 25) + 25) * svårighetsgrad;
//   const x =
//     (Math.random() * (window.innerWidth - 10 - diameter) + diameter) *
//     svårighetsgrad;
//   const y =
//     (Math.random() * (window.innerHeight - 10 - diameter) + diameter) *
//     svårighetsgrad;
//   c.beginPath();
//   c.arc(
//     x - diameter / 2,
//     y - diameter / 2,
//     diameter / 2,
//     0,
//     Math.PI * 2,
//     false
//   );
//   c.strokeStyle = "#ea4f00";

//   c.stroke();

//   let animateX = x;
//   let animateY = y;

//   function animate() {
//     requestAnimationFrame(animate);
//     c.beginPath();
//     c.arc(
//       animateX - diameter / 2,
//       animateY - diameter / 2,
//       diameter / 2,
//       0,
//       Math.PI * 2,
//       false
//     );
//     c.strokeStyle = "#ea4f00";
//     c.fillStyle = "#ea4f00";
//     c.fill();
//     c.stroke();

//     const directionY = Math.random();
//     if (directionY > 0.6666) {
//       if (animateY < window.innerHeight - diameter) animateY++;
//     }
//     if (directionY < 0.3334) {
//       if (animateY > 0 + diameter) animateY--;
//     }
//     const directionX = Math.random();
//     if (directionX > 0.6666) {
//       if (animateX < window.innerWidth - diameter) animateX++;
//     }
//     if (directionX < 0.3334) {
//       if (animateX > 0 + diameter) animateX--;
//     }
//   }
//   animate();
// };
