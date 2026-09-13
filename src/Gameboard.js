class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [];
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedAttacks = [];
    this.attackedCoords = new Set();
  }

  placeShip(ship, [row, col], direction = "horizontal") {
    const coordinates = [];

    for (let i = 0; i < ship.length; i++) {
      const r = direction === "vertical" ? row + i : row;
      const c = direction === "horizontal" ? col + i : col;

      if (r < 0 || r >= this.size || c < 0 || c >= this.size) {
        throw new Error("Ship placement is out of bounds");
      }

      coordinates.push([r, c]);
    }

    coordinates.forEach(([r, c]) => {
      this.board[r][c] = ship;
    });

    this.ships.push({ ship, coordinates });
  }

  getShipAt([row, col]) {
    return this.board[row][col];
  }

  receiveAttack([row, col]) {
    const key = `${row},${col}`;

    if (this.attackedCoords.has(key)) {
      throw new Error("This coordinate has already been attacked");
    }
    this.attackedCoords.add(key);

    const target = this.board[row][col];

    if (target !== null) {
      target.hit();
    } else {
      this.missedAttacks.push([row, col]);
    }
  }

  allShipsSunk() {
    return this.ships.every(({ ship }) => ship.isSunk());
  }
}

export default Gameboard;