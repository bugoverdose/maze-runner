import { RESPONSIVE_CELL_SIZE } from "../constants";
import { Maze } from "../domains/Maze";
import { MazeBlock } from "../domains/MazeBlock";
import { endPosition, startPosition } from "./wallPaintInfo";
import { theme } from "../styles/theme";

interface iPaintMaze {
  maze: Maze;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mazeSizeRef: React.MutableRefObject<number>;
  canvasSizeRef: React.MutableRefObject<number>;
}

export const paintMaze = ({
  maze,
  canvasRef,
  mazeSizeRef,
  canvasSizeRef,
}: iPaintMaze) => {
  if (!canvasRef.current?.getContext("2d") || !maze.player) {
    return;
  }

  const curMazeSize = mazeSizeRef.current; // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가
  const curCanvasSize = canvasSizeRef.current;

  const canvas: HTMLCanvasElement = canvasRef.current;
  let context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // 캔버스 배경: 맨밑에 와야하므로 가장 먼저
  context.fillStyle = theme.backgroundColor;
  context.fillRect(0, 0, curCanvasSize, curCanvasSize);

  // 목적지: 특수한 배경. 벽들에 의해 덮어져야하므로 먼저
  context.fillStyle = theme.finishColor;
  context.fillRect(
    (curMazeSize - 1) * RESPONSIVE_CELL_SIZE(),
    (curMazeSize - 1) * RESPONSIVE_CELL_SIZE(),
    RESPONSIVE_CELL_SIZE(),
    RESPONSIVE_CELL_SIZE()
  );

  // 미로 내의 벽들 색칠
  context.strokeStyle = theme.wallColor;
  context.strokeRect(0, 0, curCanvasSize, curCanvasSize);

  for (let col = 0; col < curMazeSize; col++) {
    for (let row = 0; row < curMazeSize; row++) {
      const { northWall, westWall, southWall, eastWall }: MazeBlock =
        maze.blocks[col][row];

      [northWall, westWall, southWall, eastWall].forEach((wallExists, idx) => {
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
      });
    }
  }

  // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
  context.fillStyle = theme.playerColor;
  context.strokeStyle = theme.playerColor;
  context.beginPath();
  context.arc(
    maze.player.col * RESPONSIVE_CELL_SIZE() + RESPONSIVE_CELL_SIZE() / 2,
    maze.player.row * RESPONSIVE_CELL_SIZE() + RESPONSIVE_CELL_SIZE() / 2,
    Math.floor(RESPONSIVE_CELL_SIZE() / 2) - 2,
    0,
    2 * Math.PI
  );
  context.stroke();
  context.fill();
};
