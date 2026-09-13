import Ship from "./Ship.js";

test("ship is created with the correct length", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("ship starts with 0 hits", () => {
  const ship = new Ship(3);
  expect(ship.hits).toBe(0);
});

test("hit() increases the number of hits by 1", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("hit() can be called multiple times", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("isSunk() returns false when hits are less than length", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns true when hits equal length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("isSunk() returns true when hits exceed length (safety check)", () => {
  const ship = new Ship(1);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
