import { RESPONSIVE_CELL_SIZE } from "../constants";
import { theme } from "../styles/theme";
import { endPosition, startPosition } from "../utils";
import { Maze } from "./Maze";
import { MazeBlock } from "./MazeBlock";

export class MazeCanvas {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.canvasRef = canvasRef;
  }

  getCanvasRef() {
    return this.canvasRef;
  }

  public render(maze: Maze) {
    if (!this.canvasRef.current?.getContext("2d")) return;
    const canvas: HTMLCanvasElement = this.canvasRef.current;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const level = maze.getLevel();
    const canvasSize = maze.getCanvasSize();
    const [colCenter, rowCenter] = maze.getPlayerCanvasPosition();

    this.paintBackground(context, canvasSize);
    this.paintFinishBlock(context, level);
    this.paintWalls(context, canvasSize, level, maze);
    this.paintPlayer(context, colCenter, rowCenter);
  }

  private paintBackground(
    context: CanvasRenderingContext2D,
    canvasSize: number
  ) {
    // 캔버스 배경: 맨밑에 와야하므로 가장 먼저
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, canvasSize, canvasSize);
  }

  private paintFinishBlock(context: CanvasRenderingContext2D, level: number) {
    // 목적지: 특수한 배경. 벽들에 의해 덮어져야하므로 먼저
    context.fillStyle = theme.finishColor;
    context.fillRect(
      (level - 1) * RESPONSIVE_CELL_SIZE(),
      (level - 1) * RESPONSIVE_CELL_SIZE(),
      RESPONSIVE_CELL_SIZE(),
      RESPONSIVE_CELL_SIZE()
    );
  }

  private paintWalls(
    context: CanvasRenderingContext2D,
    canvasSize: number,
    level: number,
    maze: Maze
  ) {
    // 미로 내의 벽들 색칠
    context.strokeStyle = theme.wallColor;
    context.strokeRect(0, 0, canvasSize, canvasSize);

    for (let col = 0; col < level; col++) {
      for (let row = 0; row < level; row++) {
        const mazeBlock: MazeBlock = maze.getBlockByColAndRow(col, row);

        const northWall = mazeBlock.northWallExists();
        const eastWall = mazeBlock.eastWallExists();
        const southWall = mazeBlock.southWallExists();
        const westWall = mazeBlock.westWallExists();

        [northWall, eastWall, southWall, westWall].forEach(
          (wallExists, idx) => {
            if (wallExists) {
              const [fromCol, fromRow] = startPosition(idx, col, row);
              const [toCol, toRow] = endPosition(idx, col, row);
              context.beginPath();
              context.moveTo(
                fromCol * RESPONSIVE_CELL_SIZE(),
                fromRow * RESPONSIVE_CELL_SIZE()
              );
              context.lineTo(
                toCol * RESPONSIVE_CELL_SIZE(),
                toRow * RESPONSIVE_CELL_SIZE()
              );
              context.stroke();
            }
          }
        );
      }
    }
  }

  private paintPlayer(
    context: CanvasRenderingContext2D,
    colCenter: number,
    rowCenter: number
  ) {
    // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
    context.fillStyle = theme.playerColor;
    context.strokeStyle = theme.playerColor;
    context.beginPath();

    context.arc(
      colCenter,
      rowCenter,
      Math.floor(RESPONSIVE_CELL_SIZE() / 2) - 2,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.fill();
  }
}
