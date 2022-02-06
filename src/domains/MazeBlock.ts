export class MazeBlock {
  private col: number;
  private row: number;

  private northWall: boolean = true;
  private eastWall: boolean = true;
  private southWall: boolean = true;
  private westWall: boolean = true;

  private visited: boolean = false; // for BFS logic on maze generation only

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

  public getNoWallDirections() {
    const noWallDirections = [];

    const walls = [
      this.northWall,
      this.eastWall,
      this.southWall,
      this.westWall,
    ];

    for (let idx = 0; idx < 4; idx++) {
      if (!walls[idx]) noWallDirections.push(idx);
    }

    return noWallDirections;
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
