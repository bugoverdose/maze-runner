import { createRef } from "react";
import { RESPONSIVE_CELL_SIZE } from "../constants";
import { theme } from "../styles/theme";
import { endPosition, startPosition } from "../utils";
import { Maze } from "./Maze";
import { MazeBlock } from "./MazeBlock";

export class MazeCanvas {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private level: number;
  private canvasSize: number;

  constructor(level: number) {
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.level = level;
    this.canvasSize = level * RESPONSIVE_CELL_SIZE();
  }

  public getCanvasRef() {
    return this.canvasRef;
  }

  public getCanvasSize() {
    return this.canvasSize;
  }

  public setCanvasSize(level: number) {
    this.level = level;
    this.canvasSize = level * RESPONSIVE_CELL_SIZE();
  }

  public render(maze: Maze) {
    if (!this.canvasRef.current?.getContext("2d")) return;
    const canvas: HTMLCanvasElement = this.canvasRef.current;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const cellSize = RESPONSIVE_CELL_SIZE();

    this.paintBackground(context);
    this.paintFinishBlock(context, cellSize);
    this.paintAllWalls(context, cellSize, maze);
    this.paintPlayer(context, cellSize, maze);
  }

  private paintBackground(context: CanvasRenderingContext2D) {
    // 캔버스 배경: 맨밑에 와야하므로 가장 먼저
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, this.canvasSize, this.canvasSize);
  }

  private paintFinishBlock(
    context: CanvasRenderingContext2D,
    cellSize: number
  ) {
    // 목적지: 특수한 배경. 벽들에 의해 덮어져야하므로 먼저
    context.fillStyle = theme.finishColor;
    context.fillRect(
      (this.level - 1) * cellSize,
      (this.level - 1) * cellSize,
      cellSize,
      cellSize
    );
  }

  private paintAllWalls(
    context: CanvasRenderingContext2D,
    cellSize: number,
    maze: Maze
  ) {
    // 미로 내의 벽들 색칠: 겹치더라도 그냥 두번씩 칠하기
    context.strokeStyle = theme.wallColor;
    context.strokeRect(0, 0, this.canvasSize, this.canvasSize); // 미로 전체 테두리 선명하도록

    for (let col = 0; col < this.level; col++) {
      for (let row = 0; row < this.level; row++) {
        this.paintWalls(context, col, row, cellSize, maze);
      }
    }
  }

  private paintWalls(
    context: CanvasRenderingContext2D,
    col: number,
    row: number,
    cellSize: number,
    maze: Maze
  ) {
    const mazeBlock: MazeBlock = maze.getBlockByColAndRow(col, row);

    const northWall = mazeBlock.northWallExists();
    const eastWall = mazeBlock.eastWallExists();
    const southWall = mazeBlock.southWallExists();
    const westWall = mazeBlock.westWallExists();

    [northWall, eastWall, southWall, westWall].forEach((wallExists, idx) => {
      if (wallExists) {
        const [fromCol, fromRow] = startPosition(idx, col, row);
        const [toCol, toRow] = endPosition(idx, col, row);
        context.beginPath();
        context.moveTo(fromCol * cellSize, fromRow * cellSize);
        context.lineTo(toCol * cellSize, toRow * cellSize);
        context.stroke();
      }
    });
  }

  private paintPlayer(
    context: CanvasRenderingContext2D,
    cellSize: number,
    maze: Maze
  ) {
    const [colCenter, rowCenter] = maze.getPlayerCanvasPosition();
    const radius = Math.floor(cellSize / 2) - 2;

    // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
    context.fillStyle = theme.playerColor;
    context.strokeStyle = theme.playerColor;
    context.beginPath();

    context.arc(colCenter, rowCenter, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }
}
