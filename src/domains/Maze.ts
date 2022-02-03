import { INITIAL_LEVEL, RESPONSIVE_CELL_SIZE } from "../constants";
import { breakWalls, checkOutOfMaze, getTargetPosition } from "../utils";
import { MazeBlock } from "./MazeBlock";
import { MazeCanvas } from "./MazeCanvas";
import { Player } from "./Player";

export class Maze {
  private blocks: MazeBlock[][];
  private player: Player;
  private mazeCanvas: MazeCanvas;
  private level: number;

  public moveCountRef: number = 0;
  public isFinishedRef: boolean = false;

  constructor() {
    this.blocks = [];
    this.player = new Player();
    this.level = INITIAL_LEVEL;
    this.mazeCanvas = new MazeCanvas(this.level);

    this.generateMazeStructure();
  }

  public reset(level: number) {
    this.level = level;
    this.player.reset();
    this.mazeCanvas.setCanvasSize(level);
  }

  public getBlockByColAndRow(col: number, row: number): MazeBlock {
    return this.blocks[col][row];
  }

  private getPlayerPosition(): MazeBlock {
    const [col, row] = this.player.curPosition;
    return this.getBlockByColAndRow(col, row);
  }

  public movePlayer(keyInput: string) {
    const playerPosition = this.getPlayerPosition();
    const hasMoved = this.player.move(keyInput, playerPosition);
    return hasMoved;
  }

  public getLevel() {
    return this.level;
  }

  public getCanvasRef() {
    return this.mazeCanvas.getCanvasRef();
  }

  public generateMaze() {
    const canvasRef: React.RefObject<HTMLCanvasElement> = this.getCanvasRef();

    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    const canvasSize = this.mazeCanvas.getCanvasSize();

    canvas.height = canvasSize;
    canvas.width = canvasSize;
    canvas.style.height = canvasSize.toString();
    canvas.style.width = canvasSize.toString();

    this.generateMazeStructure();

    this.paintCanvas();
  }

  public paintCanvas() {
    this.mazeCanvas.render(this);
  }

  private generateMazeStructure() {
    const level = this.getLevel();

    this.initMazeBlocks();

    // 도착지점의 3칸이 벽이 되도록 도착지점부터 순회 시작
    const finishBlock = this.blocks[level - 1][level - 1];
    let stack: MazeBlock[] = [finishBlock];

    // 특정 네모칸을 기준으로 임의로 탐색하며 벽의 일부분 제거 (드릴 뚫기)
    // 핵심: 오직 한 방향으로부터만 각 칸에 visit
    while (this.hasUnvisited()) {
      if (!stack) break;

      let cur: MazeBlock = stack[stack.length - 1];
      cur.setVisited(true);

      if (!this.hasUnvisitedNeighbor(cur)) {
        stack.pop(); // 상하좌우의 인접한 칸들 전부 이미 탐색된 블록만 스택에서 제거
        continue;
      }

      const [curCol, curRow] = cur.getPosition();

      while (true) {
        // 현재 위치에서 랜덤으로 아직 이동하지 않은 방향으로 한 칸 이동
        let dir: number = Math.floor(Math.random() * 4);

        // 존재하지 않는 위치
        if (checkOutOfMaze(dir, level, curCol, curRow)) continue;

        const [nextCol, nextRow] = getTargetPosition(dir, curCol, curRow);
        const next: MazeBlock = this.blocks[nextCol][nextRow];

        if (next.isVisited) continue;

        breakWalls(dir, cur, next);

        stack.push(next);
        break;
      }
    }
  }

  private initMazeBlocks() {
    this.blocks = []; // 일단 현재 미로 제거

    // level x level 구조의 블록들의 이중 배열 생성
    for (let col = 0; col < this.level; col++) {
      this.blocks[col] = [];
      for (let row = 0; row < this.level; row++) {
        this.blocks[col][row] = new MazeBlock(col, row);
      } // 디폴트로 상하좌우 벽이 있는 네모칸들 생성
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

  public playerAtFinishBlock() {
    return this.player.atFinishBlock(this.level);
  }

  public getPlayerCanvasPosition() {
    const [col, row] = this.player.curPosition;
    const cellSize = RESPONSIVE_CELL_SIZE();

    return [col * cellSize + cellSize / 2, row * cellSize + cellSize / 2];
  }
}
