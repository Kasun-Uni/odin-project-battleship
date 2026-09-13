import Gameboard from "./Gameboard.js";

class Player {
  constructor(type = "real") {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  randomAttack(enemyBoard) {
    let row, col, key;

    do {
      row = Math.floor(Math.random() * enemyBoard.size);
      col = Math.floor(Math.random() * enemyBoard.size);
      key = `${row},${col}`;
    } while (enemyBoard.attackedCoords.has(key));

    return [row, col];
  }
}

export default Player;
