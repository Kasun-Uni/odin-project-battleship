import "./style.css";
import Player from "./Player.js";
import Ship from "./Ship.js";
import { renderBoard, attachBoardClickHandler } from "./dom.js";

const realPlayer = new Player("real");
const computerPlayer = new Player("computer");

const messageEl = document.getElementById("game-message");
const computerBoardEl = document.getElementById("computer-board");

let gameOver = false;

function placeHardcodedShips(player) {
  player.gameboard.placeShip(new Ship(5), [0, 0], "horizontal");
  player.gameboard.placeShip(new Ship(4), [2, 0], "horizontal");
  player.gameboard.placeShip(new Ship(3), [4, 0], "horizontal");
  player.gameboard.placeShip(new Ship(3), [6, 0], "vertical");
  player.gameboard.placeShip(new Ship(2), [8, 0], "horizontal");
}

placeHardcodedShips(realPlayer);
placeHardcodedShips(computerPlayer);

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
  if (gameOver) return;

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

  // Computer's turn
  const [compRow, compCol] = computerPlayer.randomAttack(realPlayer.gameboard);
  realPlayer.gameboard.receiveAttack([compRow, compCol]);
  renderAll();

  if (realPlayer.gameboard.allShipsSunk()) {
    endGame("Computer wins! All your ships have been sunk.");
  }
}

attachBoardClickHandler("computer-board", handlePlayerAttack);
renderAll();
