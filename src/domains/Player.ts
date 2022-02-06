import { MazeBlock } from "./MazeBlock";

export class Player {
  private col: number;
  private row: number;
  private faceDirection: number;

  constructor() {
    this.col = 0;
    this.row = 0;
    this.faceDirection = -1; // [0, 1, 2, 3] == [north, east, south, west]
  }

  public get curPosition(): number[] {
    return [this.col, this.row, this.faceDirection];
  }

  public setFaceDirection(directionIdx: number) {
    this.faceDirection = directionIdx;
  }

  public move(directionIdx: number, cur: MazeBlock): boolean {
    this.faceDirection = directionIdx;

    if (directionIdx === 0 && !cur.northWallExists()) return this.goNorth();
    if (directionIdx === 1 && !cur.eastWallExists()) return this.goEast();
    if (directionIdx === 2 && !cur.southWallExists()) return this.goSouth();
    if (directionIdx === 3 && !cur.westWallExists()) return this.goWest();
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
