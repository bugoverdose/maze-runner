import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from "../constants";
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

  public move(input: string, cur: MazeBlock): boolean {
    if (input === ARROW_UP && !cur.northWallExists()) return this.goNorth();
    if (input === ARROW_RIGHT && !cur.eastWallExists()) return this.goEast();
    if (input === ARROW_DOWN && !cur.southWallExists()) return this.goSouth();
    if (input === ARROW_LEFT && !cur.westWallExists()) return this.goWest();
    return false;
  }

  public atFinishBlock(level: number) {
    return this.col === level - 1 && this.row === level - 1;
  }

  public reset() {
    this.col = 0;
    this.row = 0;
  }

  private goNorth() {
    this.row -= 1;
    return true;
  }

  private goEast() {
    this.col += 1;
    return true;
  }

  private goSouth() {
    this.row += 1;
    return true;
  }

  private goWest() {
    this.col -= 1;
    return true;
  }
}
