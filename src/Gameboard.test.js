import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

test("gameboard starts with no ships placed", () => {
  const gameboard = new Gameboard();
  expect(gameboard.ships.length).toBe(0);
});

test("placeShip places a ship at the given coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [0, 0], "horizontal");

  expect(gameboard.ships.length).toBe(1);
});

test("placeShip correctly occupies horizontal coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [0, 0], "horizontal");

  expect(gameboard.getShipAt([0, 0])).toBe(ship);
  expect(gameboard.getShipAt([0, 1])).toBe(ship);
  expect(gameboard.getShipAt([0, 2])).toBe(ship);
  expect(gameboard.getShipAt([0, 3])).toBe(null);
});

test("placeShip correctly occupies vertical coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);

  gameboard.placeShip(ship, [4, 4], "vertical");

  expect(gameboard.getShipAt([4, 4])).toBe(ship);
  expect(gameboard.getShipAt([5, 4])).toBe(ship);
  expect(gameboard.getShipAt([6, 4])).toBe(null);
});

test("placeShip throws an error if ship would go off the board", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  expect(() => {
    gameboard.placeShip(ship, [0, 9], "horizontal");
  }).toThrow();
});

test("receiveAttack registers a hit on a ship", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0], "horizontal");

  gameboard.receiveAttack([0, 1]);

  expect(ship.hits).toBe(1);
});

test("receiveAttack records a missed attack", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0], "horizontal");

  gameboard.receiveAttack([5, 5]); // empty water

  expect(gameboard.missedAttacks).toContainEqual([5, 5]);
});

test("receiveAttack does not record a hit as a missed attack", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0], "horizontal");

  gameboard.receiveAttack([0, 0]);

  expect(gameboard.missedAttacks.length).toBe(0);
});

test("receiveAttack throws an error if the same coordinate is attacked twice", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([2, 2]);

  expect(() => {
    gameboard.receiveAttack([2, 2]);
  }).toThrow();
});

test("allShipsSunk returns false when at least one ship is not sunk", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(2);
  gameboard.placeShip(ship1, [0, 0], "horizontal");
  gameboard.placeShip(ship2, [1, 0], "horizontal");

  gameboard.receiveAttack([0, 0]); // sinks ship1

  expect(gameboard.allShipsSunk()).toBe(false);
});

test("allShipsSunk returns true when every ship is sunk", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(1);
  gameboard.placeShip(ship1, [0, 0], "horizontal");
  gameboard.placeShip(ship2, [1, 0], "horizontal");

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);

  expect(gameboard.allShipsSunk()).toBe(true);
});

test("placeShip throws an error if it overlaps another ship", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(3);
  const ship2 = new Ship(2);

  gameboard.placeShip(ship1, [0, 0], "horizontal");

  expect(() => {
    gameboard.placeShip(ship2, [0, 1], "horizontal");
  }).toThrow();
});
