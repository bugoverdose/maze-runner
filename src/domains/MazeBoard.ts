import { MazeBlock } from "./MazeBlock";
import { Player } from "./Player";

export class MazeBoard {
  player: Player;
  size: number;
  blocks: MazeBlock[][];

  constructor(size: number, cellSize: number) {
    this.player = new Player();
    this.size = size;
    this.blocks = [];
  }

  hasUnvisited(mazeCells: MazeBlock[][]) {
    for (let col = 0; col < this.size; col++) {
      for (let row = 0; row < this.size; row++) {
        if (!mazeCells[col][row].visited) {
          return true;
        }
      }
    }
    return false;
  }

  hasUnvisitedNeighbor(mazeCell: MazeBlock) {
    return (
      (mazeCell.col !== 0 &&
        !this.blocks[mazeCell.col - 1][mazeCell.row].visited) ||
      (mazeCell.col !== this.size - 1 &&
        !this.blocks[mazeCell.col + 1][mazeCell.row].visited) ||
      (mazeCell.row !== 0 &&
        !this.blocks[mazeCell.col][mazeCell.row - 1].visited) ||
      (mazeCell.row !== this.size - 1 &&
        !this.blocks[mazeCell.col][mazeCell.row + 1].visited)
    );
  }
}
