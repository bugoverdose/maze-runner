import { MazeBlock } from "./MazeBlock";
import { Player } from "./Player";

export class Maze {
  blocks: MazeBlock[][];
  player: Player;

  constructor() {
    this.blocks = [];
    this.player = new Player();
  }

  hasUnvisited(mazeBlocks: MazeBlock[][]) {
    const size = mazeBlocks.length;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (!mazeBlocks[col][row].visited) {
          return true;
        }
      }
    }
    return false;
  }

  hasUnvisitedNeighbor(mazeBlock: MazeBlock, size: number) {
    return (
      (mazeBlock.col !== 0 &&
        !this.blocks[mazeBlock.col - 1][mazeBlock.row].visited) ||
      (mazeBlock.col !== size - 1 &&
        !this.blocks[mazeBlock.col + 1][mazeBlock.row].visited) ||
      (mazeBlock.row !== 0 &&
        !this.blocks[mazeBlock.col][mazeBlock.row - 1].visited) ||
      (mazeBlock.row !== size - 1 &&
        !this.blocks[mazeBlock.col][mazeBlock.row + 1].visited)
    );
  }
}