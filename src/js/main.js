import "../scss/main.scss";
import {
  genereraDinCell,
  genereraMotståndarCell,
} from "./object-creators/cell-creator";
import { genereraMat } from "./object-creators/food-creator";

const canvas = document.querySelector(".plan");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const c = canvas.getContext("2d");

const stateOfGame = {
  svårighetsgrad: 1,
  antalMotståndare: 5,
};

const minCell = {
  dnaMängd: 1,
  diameter: Math.random() * (50 - 25) + 25,
  hastighet: Math.random() * (5 - 0) + 0,
  energi: 1000,
  matTillCelldelning: 0,
};

let nrOfChildrenCells = 1;

const startaRunda = (c, stateOfGame, minCell) => {
  const { antalMotståndare, svårighetsgrad } = stateOfGame;

  function cleanScreenOnNewFrame() {
    requestAnimationFrame(cleanScreenOnNewFrame);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  cleanScreenOnNewFrame();

  const foodlist = genereraMat(c, svårighetsgrad);

  genereraDinCell(c, minCell, foodlist, nrOfChildrenCells);

  //   for (let i = 0; i < antalMotståndare; i++) {
  //     genereraMotståndarCell(c, stateOfGame, foodlist);
  //   }
};

startaRunda(c, stateOfGame, minCell);
