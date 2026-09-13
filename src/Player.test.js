import Player from "./Player.js";
import Gameboard from "./Gameboard.js";

test("player has its own gameboard", () => {
  const player = new Player("real");
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test("player type defaults to 'real' if not specified", () => {
  const player = new Player();
  expect(player.type).toBe("real");
});

test("player can be created as a computer type", () => {
  const player = new Player("computer");
  expect(player.type).toBe("computer");
});

test("randomAttack returns a coordinate within board bounds", () => {
  const player = new Player("computer");
  const enemyBoard = new Gameboard();

  const [row, col] = player.randomAttack(enemyBoard);

  expect(row).toBeGreaterThanOrEqual(0);
  expect(row).toBeLessThan(enemyBoard.size);
  expect(col).toBeGreaterThanOrEqual(0);
  expect(col).toBeLessThan(enemyBoard.size);
});

test("randomAttack never picks the same coordinate twice", () => {
  const player = new Player("computer");
  const enemyBoard = new Gameboard(2); // tiny 2x2 board -> only 4 possible coords

  const attacked = new Set();

  for (let i = 0; i < 4; i++) {
    const [row, col] = player.randomAttack(enemyBoard);
    enemyBoard.receiveAttack([row, col]);
    const key = `${row},${col}`;
    expect(attacked.has(key)).toBe(false);
    attacked.add(key);
  }
});

test("randomlyPlaceShips places all given ships without overlapping or going off-board", () => {
  const player = new Player("real");
  const shipLengths = [5, 4, 3, 3, 2];

  player.randomlyPlaceShips(shipLengths);

  expect(player.gameboard.ships.length).toBe(5);

  // Confirm every ship's coordinates are all within bounds
  player.gameboard.ships.forEach(({ coordinates }) => {
    coordinates.forEach(([row, col]) => {
      expect(row).toBeGreaterThanOrEqual(0);
      expect(row).toBeLessThan(player.gameboard.size);
      expect(col).toBeGreaterThanOrEqual(0);
      expect(col).toBeLessThan(player.gameboard.size);
    });
  });
});

