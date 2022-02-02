// dir = [northWall, eastWall, southWall, wastWall]
// 0 1 2   (row = 0)
// 1       (row = 1)
// 2       (row = 2)

const col = [0, 1, 0, -1];
const row = [-1, 0, 1, 0];

export const getTargetPosition = (
  dir: number,
  curCol: number,
  curRow: number
) => {
  return [curCol + col[dir], curRow + row[dir]];
};

export const checkOutOfMaze = (
  dir: number,
  level: number,
  curCol: number,
  curRow: number
) => {
  if (dir === 0) {
    return curRow <= 0;
  }
  if (dir === 1) {
    return curCol >= level - 1;
  }
  if (dir === 2) {
    return curRow >= level - 1;
  }
  return curCol <= 0;
};
