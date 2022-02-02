import { Maze } from "../domains/Maze";

export const movePlayer = (direction: string, maze: Maze): boolean => {
  const playerPosition = maze.getBlockByColAndRow(
    maze.player.col,
    maze.player.row
  );

  if (direction === "ArrowUp" && !playerPosition.northWallExists()) {
    maze.player.row -= 1;
  } else if (direction === "ArrowRight" && !playerPosition.eastWallExists()) {
    maze.player.col += 1;
  } else if (direction === "ArrowDown" && !playerPosition.southWallExists()) {
    maze.player.row += 1;
  } else if (direction === "ArrowLeft" && !playerPosition.westWallExists()) {
    maze.player.col -= 1;
  } else {
    return false;
  }
  return true;
};
