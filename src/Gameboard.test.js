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
