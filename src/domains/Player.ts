import { MazeBlock } from "./MazeBlock";

export class Player {
  private col: number;
  private row: number;

  constructor() {
    this.col = 0;
    this.row = 0;
  }

  public get curPosition(): number[] {
    return [this.col, this.row];
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

  public atFinishBlock(level: number) {
    return this.col === level - 1 && this.row === level - 1;
  }

  reset() {
    this.col = 0;
    this.row = 0;
  }
}
