import "./style.css";
import Player from "./Player.js";
import Ship from "./Ship.js";
import { renderBoard } from "./dom.js";

const realPlayer = new Player("real");
const computerPlayer = new Player("computer");

function placeHardcodedShips(player) {
  player.gameboard.placeShip(new Ship(5), [0, 0], "horizontal");
  player.gameboard.placeShip(new Ship(4), [2, 0], "horizontal");
  player.gameboard.placeShip(new Ship(3), [4, 0], "horizontal");
  player.gameboard.placeShip(new Ship(3), [6, 0], "vertical");
  player.gameboard.placeShip(new Ship(2), [8, 0], "horizontal");
}

placeHardcodedShips(realPlayer);
placeHardcodedShips(computerPlayer);

renderBoard(realPlayer.gameboard, "player-board", true);
renderBoard(computerPlayer.gameboard, "computer-board", false);
