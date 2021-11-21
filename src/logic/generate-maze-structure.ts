import { MazeBlock } from "../domains/MazeBlock";
import { MazeBoard } from "../domains/MazeBoard";

export const generateMazeStructure = (maze: MazeBoard) => {
  // 미로를 구성하는 각 네모칸들의 이중 배열 생성
  for (let col = 0; col < maze.size; col++) {
    maze.blocks[col] = [];
    for (let row = 0; row < maze.size; row++) {
      maze.blocks[col][row] = new MazeBlock(col, row);
    } // 디폴트로 상하좌우 벽이 있는 네모칸들 생성
  }

  // 도착지점의 3칸이 벽이 되도록 도착지점부터 순회 시작
  let stack: MazeBlock[] = [maze.blocks[maze.size - 1][maze.size - 1]];

  // 특정 네모칸을 기준으로 임의로 탐색하며 벽의 일부분 제거 (드릴 뚫기)
  // 핵심: 두 가지 이상의 방식으로 같은 칸에 도달가능하면 안됨
  while (maze.hasUnvisited(maze.blocks)) {
    if (!stack) {
      break;
    }
    let cur: MazeBlock = stack[stack.length - 1];
    cur.visited = true;
    if (!maze.hasUnvisitedNeighbor(cur)) {
      stack.pop(); // 상하좌우의 인접한 칸들 전부 탐색된 경우 스택에서 제거
    } else {
      let next: MazeBlock | null = null;
      let foundNeighbor: boolean = false;
      while (!foundNeighbor) {
        let dir: number = Math.floor(Math.random() * 4);
        if (
          dir === 0 &&
          cur.col < maze.size - 1 &&
          !maze.blocks[cur.col + 1][cur.row].visited
        ) {
          cur.eastWall = false;
          next = maze.blocks[cur.col + 1][cur.row];
          next.westWall = false;
          foundNeighbor = true;
        } else if (
          dir === 1 &&
          cur.row > 0 &&
          !maze.blocks[cur.col][cur.row - 1].visited
        ) {
          cur.northWall = false;
          next = maze.blocks[cur.col][cur.row - 1];
          next.southWall = false;
          foundNeighbor = true;
        } else if (
          dir === 2 &&
          cur.row < maze.size - 1 &&
          !maze.blocks[cur.col][cur.row + 1].visited
        ) {
          cur.southWall = false;
          next = maze.blocks[cur.col][cur.row + 1];
          next.northWall = false;
          foundNeighbor = true;
        } else if (
          dir === 3 &&
          cur.col > 0 &&
          !maze.blocks[cur.col - 1][cur.row].visited
        ) {
          cur.westWall = false;
          next = maze.blocks[cur.col - 1][cur.row];
          next.eastWall = false;
          foundNeighbor = true;
        }

        if (foundNeighbor && next) {
          stack.push(next);
        }
      }
    }
  }

  return maze;
};
