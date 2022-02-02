import { MazeBlock } from "./MazeBlock";

export class Player {
  col: number;
  row: number;

  constructor() {
    this.col = 0;
    this.row = 0;
  }

  public move(direction: string, curBlock: MazeBlock): boolean {
    let hasMoved = true;
    if (direction === "ArrowUp" && !curBlock.northWallExists()) {
      this.row -= 1;
    } else if (direction === "ArrowRight" && !curBlock.eastWallExists()) {
      this.col += 1;
    } else if (direction === "ArrowDown" && !curBlock.southWallExists()) {
      this.row += 1;
    } else if (direction === "ArrowLeft" && !curBlock.westWallExists()) {
      this.col -= 1;
    } else {
      hasMoved = false;
    }
    return hasMoved;
  }

  public isFinished(level: number) {
    return this.col === level - 1 && this.row === level - 1;
  }

  reset() {
    this.col = 0;
    this.row = 0;
  }
}
