// dir = [northWall, eastWall, southWall, wastWall]

// 시작점 블록(0,0) 하나의 테두리는 (0,0) => (0,1) => (1,1) => (1,0) => (0,0) 순으로 그으면 완성
// (0,0) => (1,0) : left top to right top for north wall
// (1,0) => (1,1) : right top to right bottom for east wall

export const startPosition = (
  dir: number,
  col: number,
  row: number
): number[] => {
  if (dir === 0) return [col, row];
  if (dir === 1) return [col + 1, row];
  if (dir === 2) return [col + 1, row + 1];
  return [col, row + 1];
};

export const endPosition = (
  dir: number,
  col: number,
  row: number
): number[] => {
  if (dir === 0) return [col + 1, row];
  if (dir === 1) return [col + 1, row + 1];
  if (dir === 2) return [col, row + 1];
  return [col, row];
};
