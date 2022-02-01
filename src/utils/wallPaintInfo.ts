// [northWall, westWall, southWall, eastWall]

export const startPosition = (
  dir: number,
  col: number,
  row: number
): number[] => {
  if (dir === 0) {
    return [col, row];
  } else if (dir === 1) {
    return [col, row];
  } else if (dir === 2) {
    return [col, row + 1];
  } else {
    return [col + 1, row];
  }
};

export const endPosition = (
  dir: number,
  col: number,
  row: number
): number[] => {
  if (dir === 0) {
    return [col + 1, row];
  } else if (dir === 1) {
    return [col, row + 1];
  } else if (dir === 2) {
    return [col + 1, row + 1];
  } else {
    return [col + 1, row + 1];
  }
};
