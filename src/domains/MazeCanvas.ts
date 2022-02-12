import { createRef } from "react";
import { theme } from "styles/theme";
import { endPosition, startPosition } from "utils";
import { Maze } from "./Maze";
import { MazeBlock } from "./MazeBlock";

export class MazeCanvas {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private level: number;

  constructor(level: number) {
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.level = level;
  }

  public getCanvasRef() {
    return this.canvasRef;
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public render(maze: Maze) {
    if (!this.canvasRef.current?.getContext("2d")) return;

    const canvas: HTMLCanvasElement = this.canvasRef.current;

    const canvasSize = canvas.width;
    canvas.height = canvasSize;

    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const blockSize = canvasSize / this.level;

    this.paintBackground(context, canvasSize);
    this.paintFinishBlock(context, blockSize);
    this.paintAllWalls(context, canvasSize, blockSize, maze);
    this.paintPlayer(context, blockSize, maze);
  }

  private paintBackground(
    context: CanvasRenderingContext2D,
    canvasSize: number
  ) {
    // 캔버스 배경: 맨밑에 와야하므로 가장 먼저
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, canvasSize, canvasSize);
  }

  private paintFinishBlock(
    context: CanvasRenderingContext2D,
    blockSize: number
  ) {
    // 목적지: 특수한 배경. 벽들에 의해 덮어져야하므로 먼저
    context.fillStyle = theme.finishColor;
    context.fillRect(
      (this.level - 1) * blockSize,
      (this.level - 1) * blockSize,
      blockSize,
      blockSize
    );
  }

  private paintAllWalls(
    context: CanvasRenderingContext2D,
    canvasSize: number,
    blockSize: number,
    maze: Maze
  ) {
    // 미로 내의 벽들 색칠: 겹치더라도 그냥 두번씩 칠하기
    context.strokeStyle = theme.wallColor;
    context.strokeRect(0, 0, canvasSize, canvasSize); // 미로 전체 테두리 선명하도록

    for (let col = 0; col < this.level; col++) {
      for (let row = 0; row < this.level; row++) {
        this.paintWalls(context, col, row, blockSize, maze);
      }
    }
  }

  private paintWalls(
    context: CanvasRenderingContext2D,
    col: number,
    row: number,
    blockSize: number,
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
        context.moveTo(fromCol * blockSize, fromRow * blockSize);
        context.lineTo(toCol * blockSize, toRow * blockSize);
        context.stroke();
      }
    });
  }

  private paintPlayer(
    context: CanvasRenderingContext2D,
    blockSize: number,
    maze: Maze
  ) {
    const [col, row, faceDirection] = maze.getPlayerPosition();
    const blockColPosition = col * blockSize;
    const blockRowPosition = row * blockSize;
    const centerPos = blockSize / 2;

    const colCenter = blockColPosition + centerPos;
    const rowCenter = blockRowPosition + centerPos;
    const bodyRadius = Math.floor(centerPos) - 2;

    // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
    context.fillStyle = theme.playerColor;
    context.strokeStyle = theme.playerColor;
    context.beginPath();

    context.arc(colCenter, rowCenter, bodyRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();

    // 눈 색칠
    context.fillStyle = theme.backgroundColor;
    context.strokeStyle = theme.backgroundColor;

    const eyeRadiusX = bodyRadius / 24;
    const eyeRadiusY = eyeRadiusX * 3;
    const { leftEye, rightEye, rotation } = this.calculateEyePositions(
      blockSize,
      faceDirection
    );

    [leftEye, rightEye].forEach((eyePositioning) => {
      context.beginPath();
      context.ellipse(
        blockColPosition + eyePositioning[0],
        blockRowPosition + eyePositioning[1],
        eyeRadiusX,
        eyeRadiusY,
        rotation,
        0,
        2 * Math.PI
      );
      context.stroke();
      context.fill();
    });
  }

  private calculateEyePositions(blockSize: number, directionIdx: number) {
    const cheekSize = (blockSize * 4) / 10;
    const noseSize = 1 + blockSize / 6;

    // North
    let leftEye = [cheekSize, noseSize];
    let rightEye = [blockSize - cheekSize, noseSize];
    let rotation = 0;

    // East
    if (directionIdx === 1) {
      leftEye = [blockSize - noseSize, cheekSize];
      rightEye = [blockSize - noseSize, blockSize - cheekSize];
      rotation = Math.PI / 2;
    }

    // South
    if (directionIdx === 2) {
      leftEye = [blockSize - cheekSize, blockSize - noseSize];
      rightEye = [cheekSize, blockSize - noseSize];
    }

    // West
    if (directionIdx === 3) {
      leftEye = [noseSize, blockSize - cheekSize];
      rightEye = [noseSize, cheekSize];
      rotation = Math.PI / 2;
    }

    return { leftEye, rightEye, rotation };
  }
}
