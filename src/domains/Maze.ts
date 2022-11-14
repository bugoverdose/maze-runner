import { INITIAL_LEVEL } from "constants/logic";
import { breakWalls, checkOutOfMaze, getTargetPosition } from "utils";
import { MazeBlock } from "./MazeBlock";
import { MazeCanvas } from "./MazeCanvas";
import { Player } from "./Player";

export class Maze {
  private blocks: MazeBlock[][];
  private player: Player;
  private level: number;
  private mazeCanvas: MazeCanvas;

  private moveCountRef: number = 0;
  private isFinishedRef: boolean = false;

  constructor() {
    this.blocks = [];
    this.player = new Player();
    this.level = INITIAL_LEVEL;
    this.mazeCanvas = new MazeCanvas(this.level);
  }

  public reset(level: number) {
    this.level = level;
    this.player.reset();
    this.mazeCanvas.setLevel(level);
  }

  public getBlockByColAndRow(col: number, row: number): MazeBlock {
    return this.blocks[col][row];
  }

  public getPlayerPosition(): number[] {
    const [col, row, faceDirection] = this.player.curPosition;
    return [col, row, faceDirection];
  }

  private getPlayerPositionBlock(): MazeBlock {
    const [col, row] = this.getPlayerPosition();
    return this.getBlockByColAndRow(col, row);
  }

  public movePlayer(directionIdx: number) {
    const playerPosition = this.getPlayerPositionBlock();
    const hasMoved = this.player.move(directionIdx, playerPosition);
    return hasMoved;
  }

  public getLevel() {
    return this.level;
  }

  public getCanvasRef() {
    return this.mazeCanvas.getCanvasRef();
  }

  public playerAtFinishBlock() {
    return this.player.atFinishBlock(this.level);
  }

  public generateMaze() {
    this.initMazeStructure();
    this.setRandomFacingDirection();
    this.paintCanvas();
  }

  public paintCanvas() {
    this.mazeCanvas.render(this);
  }

  private setRandomFacingDirection() {
    const [playerCol, playerRow] = this.player.curPosition;
    const noWallDirections =
      this.blocks[playerCol][playerRow].getNoWallDirections();
    const randomIdx = Math.floor(Math.random() * noWallDirections.length);

    this.player.setFaceDirection(noWallDirections[randomIdx]);
  }

  private initMazeStructure() {
    this.initMazeBlocks();
    this.generateMazeStructure();
  }

  private initMazeBlocks() {
    this.blocks = []; // 일단 현재 미로 제거

    // level x level 구조의 블록들의 이중 배열 생성
    for (let col = 0; col < this.level; col++) {
      this.blocks[col] = [];
      for (let row = 0; row < this.level; row++) {
        this.blocks[col].push(new MazeBlock(col, row));
      } // 디폴트로 상하좌우 벽이 있는 네모칸들 생성
    }
  }

  private generateMazeStructure() {
    const level = this.getLevel();

    const finishBlock = this.blocks[level - 1][level - 1]; // 도착지점의 3칸이 벽이 되도록 도착지점부터 순회 시작
    let stack: MazeBlock[] = [finishBlock];

    // 특정 네모칸을 기준으로 임의로 탐색하며 벽의 일부분 제거 (드릴 뚫기) - 각 블록에 대해 벽을 뚫으면서 visit하는 것은 최대 1번
    while (this.hasUnvisited()) {
      if (!stack) return;

      let cur: MazeBlock = stack[stack.length - 1];
      cur.setVisited(true);

      if (!this.hasUnvisitedNeighbor(cur)) {
        stack.pop(); // 상하좌우의 인접한 칸들 전부 이미 탐색된 블록만 스택에서 제거
        continue;
      }

      this.breakRandomWall(cur, stack);
    }
  }

  private hasUnvisited() {
    const level = this.getLevel();
    for (let col = 0; col < level; col++) {
      for (let row = 0; row < level; row++) {
        if (!this.blocks[col][row].isVisited) return true;
      }
    }
    return false;
  }

  private hasUnvisitedNeighbor(mazeBlock: MazeBlock) {
    const level = this.getLevel();
    const [col, row] = mazeBlock.getPosition();
    return (
      (col !== 0 && !this.blocks[col - 1][row].isVisited) ||
      (col !== level - 1 && !this.blocks[col + 1][row].isVisited) ||
      (row !== 0 && !this.blocks[col][row - 1].isVisited) ||
      (row !== level - 1 && !this.blocks[col][row + 1].isVisited)
    );
  }

  private breakRandomWall(cur: MazeBlock, stack: MazeBlock[]) {
    const [curCol, curRow] = cur.getPosition();
    const level = this.getLevel();

    // 상하좌우 중 적어도 한쪽 방향으로 unvisited block이 존재한다는 점은 이미 validate됨
    while (true) {
      let dir: number = Math.floor(Math.random() * 4); // 현재 위치에서 랜덤으로 아직 이동하지 않은 방향으로 한 칸 이동

      if (checkOutOfMaze(dir, level, curCol, curRow)) continue; // 해당 방향에 블록 존재 여부 확인

      const [nextCol, nextRow] = getTargetPosition(dir, curCol, curRow);
      const next: MazeBlock = this.blocks[nextCol][nextRow];

      if (next.isVisited) continue;

      breakWalls(dir, cur, next);

      return stack.push(next);
    }
  }

  public getMoveCountRef() {
    return this.moveCountRef;
  }

  public setMoveCountRef(moveCountRef: number) {
    this.moveCountRef = moveCountRef;
  }

  public getIsFinishedRef() {
    return this.isFinishedRef;
  }

  public setIsFinishedRef(isFinishedRef: boolean) {
    this.isFinishedRef = isFinishedRef;
  }
}
