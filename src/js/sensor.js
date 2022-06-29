// class Sensor {
//   constructor(cell) {
//     this.cell = cell;
//     this.rayCount = 5;
//     this.rayLenght = 100;
//     this.raySpread = Math.PI / 4;

//     this.rays = [];
//     this.readings = [];
//   }

//   lerp(A, B, t) {
//     return A + (B - A) * t;
//   }

//   //   getIntersection(A, B, C, D) {
//   //     const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
//   //     const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
//   //     const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

//   //     if (bottom != 0) {
//   //       const t = tTop / bottom;
//   //       const u = uTop / bottom;
//   //       if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
//   //         return {
//   //           x: this.lerp(A.x, B.x, t),
//   //           y: this.lerp(A.y, B.y, t),
//   //           offset: t,
//   //         };
//   //       }
//   //       return null;
//   //     }
//   //   }

//   update(foods) {
//     this.#castRays();
//     // this.readings = [];
//     // for (let i = 0; i < this.rays.length; i++) {
//     //   this.readings.push(this.#getReading(this.rays[i], foods));
//     // }
//   }

//   //   #getReading(ray, foods) {
//   //     let touches = [];

//   //     for (let i = 0; i < foods.length; i++) {
//   //       const touch = this.getIntersection(ray[0], ray[1], foods[i], foods[i]);
//   //       if (touch) {
//   //         touches.push(touch);
//   //       }
//   //     }
//   //     if (touches.length == 0) {
//   //       return 0;
//   //     } else {
//   //       const offsets = touches.map((e) => e.offset);
//   //       const minOffset = Math.min(...offsets);
//   //       return touches.find((e) => e.offset == minOffset);
//   //     }
//   //   }

//   #castRays() {
//     this.rays = [];
//     for (let i = 0; i < this.rayCount; i++) {
//       const rayAngle =
//         this.lerp(
//           this.raySpread / 2,
//           -this.raySpread / 2,
//           this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
//         ) + this.cell.orientation;

//       const start = { x: this.cell.x, y: this.cell.y };
//       const end = {
//         x: this.cell.x - Math.sin(rayAngle) * this.rayLenght,
//         y: this.cell.y - Math.cos(rayAngle) * this.rayLenght,
//       };
//       this.rays.push([start, end]);
//     }
//   }

//   draw(c) {
// for (let i = 0; i < this.rayCount; i++) {
//   let end = this.rays[i][1];
//   if (this.readings[i]) {
//     end = this.readings[i];
//   }
//   c.beginPath();
//   c.lineWidth = 2;
//   c.strokeStyle = "yellow";
//   c.moveTo(this.rays[i][0].x, this.rays[i][0].y);
//   c.lineTo(end.x, end.y);
//   c.stroke();
// }
//   }
// }

// export default Sensor;
