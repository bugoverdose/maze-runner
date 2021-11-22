import { Maze } from "../domains/Maze";

export const movePlayer = (direction: string, maze: Maze): boolean => {
  const playerPosition = maze.blocks[maze.player.col][maze.player.row];
  if (direction === "ArrowLeft" && !playerPosition.westWall) {
    maze.player.col -= 1;
  } else if (direction === "ArrowRight" && !playerPosition.eastWall) {
    maze.player.col += 1;
  } else if (direction === "ArrowUp" && !playerPosition.northWall) {
    maze.player.row -= 1;
  } else if (direction === "ArrowDown" && !playerPosition.southWall) {
    maze.player.row += 1;
  } else {
    return false;
  }
  return true;
};
