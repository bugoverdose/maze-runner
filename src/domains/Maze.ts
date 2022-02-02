import { INITIAL_MAZE_LEVEL, RESPONSIVE_CELL_SIZE } from "../constants";
import { MazeBlock } from "./MazeBlock";
import { Player } from "./Player";

export class Maze {
  blocks: MazeBlock[][];
  player: Player;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  level: number;
  canvasSize: number;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.blocks = [];
    this.player = new Player();
    this.canvasRef = canvasRef;
    this.level = INITIAL_MAZE_LEVEL;
    this.canvasSize = this.level * RESPONSIVE_CELL_SIZE();

    this.generateMazeStructure();
  }

  getCanvasRef() {
    return this.canvasRef;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
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
    while (this.hasUnvisited(this.blocks)) {
      if (!stack) {
        break;
      }
      let cur: MazeBlock = stack[stack.length - 1];
      cur.visited = true;
      if (!this.hasUnvisitedNeighbor(cur, level)) {
        stack.pop(); // 상하좌우의 인접한 칸들 전부 이미 탐색된 네모칸은 스택에서 제거
      } else {
        let next: MazeBlock | null = null;
        let foundNeighbor: boolean = false;
        while (!foundNeighbor) {
          // 현재 위치에서 랜덤으로 아직 이동하지 않은 방향으로 이동
          let dir: number = Math.floor(Math.random() * 4);
          if (
            dir === 0 &&
            cur.col < level - 1 &&
            !this.blocks[cur.col + 1][cur.row].visited
          ) {
            cur.eastWall = false;
            next = this.blocks[cur.col + 1][cur.row];
            next.westWall = false;
            foundNeighbor = true;
          } else if (
            dir === 1 &&
            cur.row > 0 &&
            !this.blocks[cur.col][cur.row - 1].visited
          ) {
            cur.northWall = false;
            next = this.blocks[cur.col][cur.row - 1];
            next.southWall = false;
            foundNeighbor = true;
          } else if (
            dir === 2 &&
            cur.row < level - 1 &&
            !this.blocks[cur.col][cur.row + 1].visited
          ) {
            cur.southWall = false;
            next = this.blocks[cur.col][cur.row + 1];
            next.northWall = false;
            foundNeighbor = true;
          } else if (
            dir === 3 &&
            cur.col > 0 &&
            !this.blocks[cur.col - 1][cur.row].visited
          ) {
            cur.westWall = false;
            next = this.blocks[cur.col - 1][cur.row];
            next.eastWall = false;
            foundNeighbor = true;
          }

          if (foundNeighbor && next) {
            stack.push(next);
          }
        }
      }
    }
  }

  hasUnvisited(mazeBlocks: MazeBlock[][]) {
    const size = mazeBlocks.length;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (!mazeBlocks[col][row].visited) {
          return true;
        }
      }
    }
    return false;
  }

  hasUnvisitedNeighbor(mazeBlock: MazeBlock, size: number) {
    return (
      (mazeBlock.col !== 0 &&
        !this.blocks[mazeBlock.col - 1][mazeBlock.row].visited) ||
      (mazeBlock.col !== size - 1 &&
        !this.blocks[mazeBlock.col + 1][mazeBlock.row].visited) ||
      (mazeBlock.row !== 0 &&
        !this.blocks[mazeBlock.col][mazeBlock.row - 1].visited) ||
      (mazeBlock.row !== size - 1 &&
        !this.blocks[mazeBlock.col][mazeBlock.row + 1].visited)
    );
  }
}
