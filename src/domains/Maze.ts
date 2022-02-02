import { INITIAL_MAZE_LEVEL, RESPONSIVE_CELL_SIZE } from "../constants";
import { MazeBlock } from "./MazeBlock";
import { MazeCanvas } from "./MazeCanvas";
import { Player } from "./Player";

export class Maze {
  private blocks: MazeBlock[][];
  private player: Player;
  private mazeCanvas: MazeCanvas;
  level: number;
  canvasSize: number;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.blocks = [];
    this.player = new Player();
    this.mazeCanvas = new MazeCanvas(canvasRef);
    this.level = INITIAL_MAZE_LEVEL;
    this.canvasSize = this.level * RESPONSIVE_CELL_SIZE();

    this.generateMazeStructure();
  }

  public reset(level: number) {
    this.level = level;
    this.player.reset();
  }

  getBlockByColAndRow(col: number, row: number): MazeBlock {
    return this.blocks[col][row];
  }

  private getPlayerPosition(): MazeBlock {
    return this.getBlockByColAndRow(this.player.col, this.player.row);
  }

  public movePlayer(direction: string) {
    const playerPosition = this.getPlayerPosition();
    const hasMoved = this.player.move(direction, playerPosition);
    return hasMoved;
  }

  getCanvasRef() {
    return this.mazeCanvas.getCanvasRef();
  }

  public paintCanvas() {
    this.mazeCanvas.render(this);
  }

  getLevel() {
    return this.level;
  }

  getCanvasSize() {
    return this.canvasSize;
  }

  setCanvasSize(canvasSize: number) {
    this.canvasSize = canvasSize;
  }

  generateMazeStructure() {
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
      if (!stack) {
        break;
      }
      let cur: MazeBlock = stack[stack.length - 1];
      cur.setVisited(true);
      if (!this.hasUnvisitedNeighbor(cur)) {
        stack.pop(); // 상하좌우의 인접한 칸들 전부 이미 탐색된 네모칸은 스택에서 제거
      } else {
        let next: MazeBlock | null = null;
        let foundNeighbor: boolean = false;
        while (!foundNeighbor) {
          // 현재 위치에서 랜덤으로 아직 이동하지 않은 방향으로 이동
          let dir: number = Math.floor(Math.random() * 4);
          const curCol = cur.getColumn();
          const curRow = cur.getRow();
          if (
            dir === 0 &&
            curCol < level - 1 &&
            !this.blocks[curCol + 1][curRow].getVisited()
          ) {
            cur.breakEastWall();
            next = this.blocks[curCol + 1][curRow];
            next.breakWestWall();
            foundNeighbor = true;
          } else if (
            dir === 1 &&
            curRow > 0 &&
            !this.blocks[curCol][curRow - 1].getVisited()
          ) {
            cur.breakNorthWall();
            next = this.blocks[curCol][curRow - 1];
            next.breakSouthWall();
            foundNeighbor = true;
          } else if (
            dir === 2 &&
            curRow < level - 1 &&
            !this.blocks[curCol][curRow + 1].getVisited()
          ) {
            cur.breakSouthWall();
            next = this.blocks[curCol][curRow + 1];
            next.breakNorthWall();
            foundNeighbor = true;
          } else if (
            dir === 3 &&
            curCol > 0 &&
            !this.blocks[curCol - 1][curRow].getVisited()
          ) {
            cur.breakWestWall();
            next = this.blocks[curCol - 1][curRow];
            next.breakEastWall();
            foundNeighbor = true;
          }

          if (foundNeighbor && next) {
            stack.push(next);
          }
        }
      }
    }
  }

  hasUnvisited() {
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

  hasUnvisitedNeighbor(mazeBlock: MazeBlock) {
    const level = this.getLevel();
    const col = mazeBlock.getColumn();
    const row = mazeBlock.getRow();
    return (
      (col !== 0 && !this.blocks[col - 1][row].getVisited()) ||
      (col !== level - 1 && !this.blocks[col + 1][row].getVisited()) ||
      (row !== 0 && !this.blocks[col][row - 1].getVisited()) ||
      (row !== level - 1 && !this.blocks[col][row + 1].getVisited())
    );
  }

  public playerAtFinishBlock() {
    return this.player.isFinished(this.level);
  }

  public getPlayerCanvasPosition() {
    return [
      this.player.col * RESPONSIVE_CELL_SIZE() + RESPONSIVE_CELL_SIZE() / 2,
      this.player.row * RESPONSIVE_CELL_SIZE() + RESPONSIVE_CELL_SIZE() / 2,
    ];
  }
}
