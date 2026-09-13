import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

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

  randomlyPlaceShips(shipLengths) {
    // Reset the board fresh each time this is called
    this.gameboard = new Gameboard();

    shipLengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * this.gameboard.size);
        const col = Math.floor(Math.random() * this.gameboard.size);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        try {
          const ship = new Ship(length);
          this.gameboard.placeShip(ship, [row, col], direction);
          placed = true;
        } catch {
          // out of bounds or overlapping — try again
        }
      }
    });
  }
}

export default Player;