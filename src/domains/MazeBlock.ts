export class MazeBlock {
  private col: number;
  private row: number;

  private visited: boolean = false;

  private northWall: boolean = true;
  private eastWall: boolean = true;
  private southWall: boolean = true;
  private westWall: boolean = true;

  constructor(col: number, row: number) {
    this.col = col;
    this.row = row;
  }

  public getPosition() {
    return [this.col, this.row];
  }

  public get isVisited() {
    return this.visited;
  }

  public setVisited(visited: boolean) {
    this.visited = visited;
  }

  public northWallExists() {
    return this.northWall;
  }

  public breakNorthWall() {
    this.northWall = false;
  }

  public eastWallExists() {
    return this.eastWall;
  }

  public breakEastWall() {
    this.eastWall = false;
  }

  public southWallExists() {
    return this.southWall;
  }

  public breakSouthWall() {
    this.southWall = false;
  }

  public westWallExists() {
    return this.westWall;
  }

  public breakWestWall() {
    this.westWall = false;
  }
}
