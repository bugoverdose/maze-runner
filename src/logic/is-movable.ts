import { MazeBoard } from "../domains/MazeBoard";

export const isMovable = (direction: string, maze: MazeBoard) => {
  const playerPosition = maze.blocks[maze.player.col][maze.player.row];
  if (direction === "Left" && !playerPosition.westWall) {
    maze.player.col -= 1;
  } else if (direction === "Right" && !playerPosition.eastWall) {
    maze.player.col += 1;
  } else if (direction === "Up" && !playerPosition.northWall) {
    maze.player.row -= 1;
  } else if (direction === "Down" && !playerPosition.southWall) {
    maze.player.row += 1;
  } else {
    return false;
  }
  return true;
};
