import {
  EAST_IDX,
  NORTH_IDX,
  PLAYER_BODY_RATIO,
  PLAYER_EYE_HEIGHT_RATIO,
  PLAYER_EYE_WIDTH_RATIO,
  SOUTH_IDX,
} from "constants/logic";
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
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const canvasSize = canvas.width;
    canvas.height = canvasSize;

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

    mazeBlock.getEachWallExistance().forEach((wallExists, idx) => {
      if (!wallExists) {
        return;
      }
      const [fromCol, fromRow] = startPosition(idx, col, row);
      const [toCol, toRow] = endPosition(idx, col, row);

      context.beginPath();
      context.moveTo(fromCol * blockSize, fromRow * blockSize);
      context.lineTo(toCol * blockSize, toRow * blockSize);
      context.stroke();
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
    const centerPos = blockSize / PLAYER_BODY_RATIO;
    const bodyRadius = Math.floor(centerPos) - 2;

    // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
    this.paintPlayerBody(
      context,
      blockColPosition,
      blockRowPosition,
      centerPos,
      bodyRadius
    );

    // 눈 색칠
    const rotation = this.calculateRotation(faceDirection);
    this.calculateEyePositions(blockSize, faceDirection).forEach(
      (eyePosition) => {
        this.paintPlayerEye(
          context,
          blockColPosition + eyePosition[0],
          blockRowPosition + eyePosition[1],
          bodyRadius,
          rotation
        );
      }
    );
  }

  private paintPlayerBody(
    context: CanvasRenderingContext2D,
    blockColPosition: number,
    blockRowPosition: number,
    centerPos: number,
    bodyRadius: number
  ) {
    const colCenter = blockColPosition + centerPos;
    const rowCenter = blockRowPosition + centerPos;

    context.fillStyle = theme.playerColor;
    context.strokeStyle = theme.playerColor;
    context.beginPath();

    context.arc(colCenter, rowCenter, bodyRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }

  private paintPlayerEye(
    context: CanvasRenderingContext2D,
    colPosition: number,
    rowPosition: number,
    bodyRadius: number,
    rotation: number
  ) {
    const radiusX = bodyRadius / PLAYER_EYE_WIDTH_RATIO;
    const radiusY = bodyRadius / PLAYER_EYE_HEIGHT_RATIO;

    context.fillStyle = theme.backgroundColor;
    context.strokeStyle = theme.backgroundColor;
    context.beginPath();

    context.ellipse(
      colPosition,
      rowPosition,
      radiusX,
      radiusY,
      rotation,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.fill();
  }

  private calculateEyePositions(blockSize: number, directionIdx: number) {
    const cheekSize = (blockSize * 2) / 5;
    const noseSize = 1 + blockSize / 6;

    const leftEye = this.calculateLeftEyePosition(
      blockSize,
      cheekSize,
      noseSize,
      directionIdx
    );
    const rightEye = this.calculateRightEyePosition(
      blockSize,
      cheekSize,
      noseSize,
      directionIdx
    );

    return [leftEye, rightEye];
  }

  private calculateLeftEyePosition(
    blockSize: number,
    cheekSize: number,
    noseSize: number,
    directionIdx: number
  ) {
    if (directionIdx === NORTH_IDX) {
      return [cheekSize, noseSize];
    }
    if (directionIdx === EAST_IDX) {
      return [blockSize - noseSize, cheekSize];
    }
    if (directionIdx === SOUTH_IDX) {
      return [blockSize - cheekSize, blockSize - noseSize];
    }
    return [noseSize, blockSize - cheekSize];
  }

  private calculateRightEyePosition(
    blockSize: number,
    cheekSize: number,
    noseSize: number,
    directionIdx: number
  ) {
    if (directionIdx === NORTH_IDX) {
      return [blockSize - cheekSize, noseSize];
    }
    if (directionIdx === EAST_IDX) {
      return [blockSize - noseSize, blockSize - cheekSize];
    }
    if (directionIdx === SOUTH_IDX) {
      return [cheekSize, blockSize - noseSize];
    }
    return [noseSize, cheekSize];
  }

  private calculateRotation(directionIdx: number) {
    if (directionIdx === NORTH_IDX || directionIdx === SOUTH_IDX) {
      return 0;
    }
    return Math.PI / 2;
  }
}
