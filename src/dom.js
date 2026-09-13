export function renderBoard(gameboard, containerId, revealShips) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let row = 0; row < gameboard.size; row++) {
    for (let col = 0; col < gameboard.size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      const key = `${row},${col}`;
      const hasShip = gameboard.getShipAt([row, col]) !== null;
      const wasAttacked = gameboard.attackedCoords.has(key);

      if (wasAttacked && hasShip) {
        cell.classList.add("hit");
      } else if (wasAttacked && !hasShip) {
        cell.classList.add("miss");
      } else if (hasShip && revealShips) {
        cell.classList.add("ship");
      }

      container.appendChild(cell);
    }
  }
}

export function attachBoardClickHandler(containerId, onCellClick) {
  const container = document.getElementById(containerId);

  container.addEventListener("click", (event) => {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    onCellClick([row, col]);
  });
}