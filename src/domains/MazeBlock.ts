export class MazeBlock {
  col: number;
  row: number;
  eastWall: boolean = true;
  northWall: boolean = true;
  southWall: boolean = true;
  westWall: boolean = true;
  visited: boolean = false;

  constructor(col: number, row: number) {
    this.col = col;
    this.row = row;
  }
}
