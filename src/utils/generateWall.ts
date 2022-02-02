import { MazeBlock } from "../domains/MazeBlock";

const col = [0, 1, 0, -1];
const row = [-1, 0, 1, 0];

// dir = [northWall, eastWall, southWall, wastWall]
// 0 1 2   (row = 0)
// 1       (row = 1)

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

export const breakWalls = (dir: number, cur: MazeBlock, next: MazeBlock) => {
  if (dir === 0) {
    cur.breakNorthWall(); // 해당 위치에서 북쪽으로 이동 가능
    next.breakSouthWall(); // 다음 위치에서 남쪽으로 이동 가능
    return;
  }

  if (dir === 1) {
    cur.breakEastWall();
    next.breakWestWall();
    return;
  }

  if (dir === 2) {
    cur.breakSouthWall();
    next.breakNorthWall();
    return;
  }

  cur.breakWestWall();
  next.breakEastWall();
};
