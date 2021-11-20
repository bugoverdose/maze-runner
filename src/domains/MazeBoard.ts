import { MazeBlock } from "./MazeBlock";
import { Player } from "./Player";

export class MazeBoard {
  player: Player;
  backgroundColor: string;
  cols: number;
  endColor: string;
  mazeColor: string;
  playerColor: string;
  rows: number;
  blocks: MazeBlock[][];

  constructor(rows: number, cols: number, cellSize: number) {
    this.player = new Player();
    this.backgroundColor = "#c8d6e5";
    this.rows = rows;
    this.cols = cols;
    this.endColor = "#3498db";
    this.mazeColor = "#000000";
    this.playerColor = "#e74c3c";
    this.blocks = [];
  }

  hasUnvisited(mazeCells: MazeBlock[][]) {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
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
      (mazeCell.col !== this.cols - 1 &&
        !this.blocks[mazeCell.col + 1][mazeCell.row].visited) ||
      (mazeCell.row !== 0 &&
        !this.blocks[mazeCell.col][mazeCell.row - 1].visited) ||
      (mazeCell.row !== this.rows - 1 &&
        !this.blocks[mazeCell.col][mazeCell.row + 1].visited)
    );
  }
}
