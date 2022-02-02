import { INITIAL_MAZE_LEVEL, RESPONSIVE_CELL_SIZE } from "../constants";
import { checkOutOfMaze, getTargetPosition } from "../utils";
import { MazeBlock } from "./MazeBlock";
import { MazeCanvas } from "./MazeCanvas";
import { Player } from "./Player";

export class Maze {
  private blocks: MazeBlock[][];
  private player: Player;
  private mazeCanvas: MazeCanvas;
  private level: number;

  moveCountRef: number = 0;
  isFinishedRef: boolean = false;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.blocks = [];
    this.player = new Player();
    this.level = INITIAL_MAZE_LEVEL;
    this.mazeCanvas = new MazeCanvas(canvasRef, this.level);

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

  public movePlayer(direction: string) {
    const playerPosition = this.getPlayerPosition();
    const hasMoved = this.player.move(direction, playerPosition);
    return hasMoved;
  }

  public getCanvasRef() {
    return this.mazeCanvas.getCanvasRef();
  }

  public paintCanvas() {
    this.mazeCanvas.render(this);
  }

  public getLevel() {
    return this.level;
  }

  public getCanvasSize() {
    return this.mazeCanvas.getCanvasSize();
  }

  public generateMazeStructure() {
    this.blocks = []; // 일단 현재 미로 제거
    const level = this.getLevel();

    // 미로를 구성하는 각 네모칸들의 이중 배열 생성
    for (let col = 0; col < level; col++) {
      this.blocks[col] = [];
      for (let row = 0; row < level; row++) {
        this.blocks[col][row] = new MazeBlock(col, row);
      } // 디폴트로 상하좌우 벽이 있는 네모칸들 생성
    }

    // 도착지점의 3칸이 벽이 되도록 도착지점부터 순회 시작
    let stack: MazeBlock[] = [this.blocks[level - 1][level - 1]];

    // 특정 네모칸을 기준으로 임의로 탐색하며 벽의 일부분 제거 (드릴 뚫기)
    // 핵심: 두 가지 이상의 방식으로 같은 칸에 도달가능하면 안됨
    while (this.hasUnvisited()) {
      if (!stack) break;

      let cur: MazeBlock = stack[stack.length - 1];
      cur.setVisited(true);

      if (!this.hasUnvisitedNeighbor(cur)) {
        stack.pop(); // 상하좌우의 인접한 칸들 전부 이미 탐색된 네모칸은 스택에서 제거
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

        if (next.getVisited()) continue;

        if (dir === 0) {
          cur.breakNorthWall(); // 해당 위치에서 북쪽으로 이동 가능
          next.breakSouthWall(); // 다음 위치에서 남쪽으로 이동 가능
        }

        if (dir === 1) {
          cur.breakEastWall();
          next.breakWestWall();
        }

        if (dir === 2) {
          cur.breakSouthWall();
          next.breakNorthWall();
        }

        if (dir === 3) {
          cur.breakWestWall();
          next.breakEastWall();
        }

        stack.push(next);
        break;
      }
    }
  }

  private hasUnvisited() {
    const level = this.getLevel();
    for (let col = 0; col < level; col++) {
      for (let row = 0; row < level; row++) {
        if (!this.blocks[col][row].getVisited()) {
          return true;
        }
      }
    }
    return false;
  }

  private hasUnvisitedNeighbor(mazeBlock: MazeBlock) {
    const level = this.getLevel();
    const [col, row] = mazeBlock.getPosition();
    return (
      (col !== 0 && !this.blocks[col - 1][row].getVisited()) ||
      (col !== level - 1 && !this.blocks[col + 1][row].getVisited()) ||
      (row !== 0 && !this.blocks[col][row - 1].getVisited()) ||
      (row !== level - 1 && !this.blocks[col][row + 1].getVisited())
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
