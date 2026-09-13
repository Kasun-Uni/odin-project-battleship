import "./style.css";
import Player from "./Player.js";
import { renderBoard, attachBoardClickHandler } from "./dom.js";

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

const realPlayer = new Player("real");
const computerPlayer = new Player("computer");

const messageEl = document.getElementById("game-message");
const computerBoardEl = document.getElementById("computer-board");
const randomizeBtn = document.getElementById("randomize-btn");
const startBtn = document.getElementById("start-btn");

let gameOver = false;
let gameStarted = false;

function renderAll() {
  renderBoard(realPlayer.gameboard, "player-board", true);
  renderBoard(computerPlayer.gameboard, "computer-board", false);
}

function endGame(winnerText) {
  gameOver = true;
  messageEl.textContent = winnerText;
  computerBoardEl.classList.add("disabled");
}

function handlePlayerAttack([row, col]) {
  if (gameOver || !gameStarted) return;

  const key = `${row},${col}`;
  if (computerPlayer.gameboard.attackedCoords.has(key)) {
    return;
  }

  computerPlayer.gameboard.receiveAttack([row, col]);
  renderAll();

  if (computerPlayer.gameboard.allShipsSunk()) {
    endGame("You win! All enemy ships have been sunk.");
    return;
  }

  const [compRow, compCol] = computerPlayer.randomAttack(realPlayer.gameboard);
  realPlayer.gameboard.receiveAttack([compRow, compCol]);
  renderAll();

  if (realPlayer.gameboard.allShipsSunk()) {
    endGame("Computer wins! All your ships have been sunk.");
  }
}

randomizeBtn.addEventListener("click", () => {
  realPlayer.randomlyPlaceShips(SHIP_LENGTHS);
  renderAll();
  startBtn.disabled = false;
});

startBtn.addEventListener("click", () => {
  computerPlayer.randomlyPlaceShips(SHIP_LENGTHS);
  gameStarted = true;
  computerBoardEl.classList.remove("disabled");
  messageEl.textContent = "Game started! Attack the enemy board.";
  renderAll();
});

attachBoardClickHandler("computer-board", handlePlayerAttack);
renderAll();
