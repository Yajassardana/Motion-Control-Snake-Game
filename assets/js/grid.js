const GRID_SIZE = 15

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * (GRID_SIZE-3)) + 2,
    y: Math.floor(Math.random() * (GRID_SIZE-3)) + 2
  }
}

export function outsideGrid(position) {
  return (
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE
  )
}