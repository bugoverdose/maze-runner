import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { MazeBlock } from "./domains/MazeBlock";
import { MazeBoard } from "./domains/MazeBoard";
import { generateMazeStructure } from "./logic/generate-maze-structure";
import { isMovable } from "./logic/is-movable";
import { endPosition, startPosition } from "./logic/paint-wall-info";
import { CELL_SIZE } from "./styles/constants";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Canvas = styled.canvas`
  margin-bottom: 20px;
`;

const Generatorbox = styled.div``;

const Form = styled.form``;

const Label = styled.label`
  margin-right: 10px;
  font-size: 20px;
`;

const TextInput = styled.input.attrs({
  required: true,
  type: "number",
  min: "5",
  max: "25",
})`
  text-align: center;
  width: 40px;
  font-size: 20px;
`;

const SubmitBtn = styled.button`
  padding: 5px;
  font-size: 20px;
`;

const PlayContainer = styled.div<{ canvasSize: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  height: ${(props) => props.canvasSize + "px"};
`;

const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: 600;
`;

const MovementCountBox = styled.div`
  border-radius: 15px;
  border: 3px ${(props) => props.theme.backgroundColor} solid;
  padding: 45px 0px;
  margin-top: 15px;
  font-size: 30px;
`;

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(2, 50px);
  gap: 5px;
`;

const ControlBtn = styled.input.attrs({ type: "button" })`
  height: 100%;
  width: 100%;
  font-size: 30px;
  font-weight: 800;
`;

const Maze = () => {
  const theme = useTheme();

  const [mazeSize, setMazeSize] = useState(20);
  const [mazeSizeInput, setMazeSizeInput] = useState(20);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState(mazeSize * CELL_SIZE);
  const [maze, setMaze] = useState(new MazeBoard(mazeSize, CELL_SIZE));

  const [moveCount, setMoveCount] = useState(0);

  // 미로 구조 정의 후 화면에 색칠
  const generateMaze = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.height = canvasSize;
    canvas.width = canvasSize;
    canvas.style.height = canvasSize.toString();
    canvas.style.width = canvasSize.toString();

    setMaze(generateMazeStructure(maze));

    paintMaze();
  };

  // 정의된 미로 구조를 화면에 색칠
  const paintMaze = () => {
    if (!canvasRef.current?.getContext("2d") || !maze || !maze.player) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    // 캔버스 배경: 맨밑에 와야하므로 가장 먼저
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, canvasSize, canvasSize);

    // 목적지: 특수한 배경. 벽들에 의해 덮어져야하므로 먼저
    context.fillStyle = theme.finishColor;
    context.fillRect(
      (maze.size - 1) * CELL_SIZE,
      (maze.size - 1) * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // 미로 내의 벽들 색칠
    context.strokeStyle = theme.wallColor;
    context.strokeRect(0, 0, canvasSize, canvasSize);

    for (let col = 0; col < maze.size; col++) {
      for (let row = 0; row < maze.size; row++) {
        const { northWall, westWall, southWall, eastWall }: MazeBlock =
          maze.blocks[col][row];

        [northWall, westWall, southWall, eastWall].forEach(
          (wallExists, idx) => {
            if (wallExists) {
              const [fromCol, fromRow] = startPosition(idx, col, row);
              const [toCol, toRow] = endPosition(idx, col, row);
              context.beginPath();
              context.moveTo(fromCol * CELL_SIZE, fromRow * CELL_SIZE);
              context.lineTo(toCol * CELL_SIZE, toRow * CELL_SIZE);
              context.stroke();
            }
          }
        );
      }
    }

    // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
    context.fillStyle = theme.playerColor;
    context.strokeStyle = theme.playerColor;
    context.beginPath();
    context.arc(
      maze.player.col * CELL_SIZE + CELL_SIZE / 2,
      maze.player.row * CELL_SIZE + CELL_SIZE / 2,
      Math.floor(CELL_SIZE / 2) - 2,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.fill();
  };

  const onControlPlayer = (direction: string) => {
    if (isMovable(direction, maze)) {
      setMoveCount(moveCount + 1);
    }
    paintMaze();
  };

  const onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMazeSizeInput(parseInt(event.currentTarget.value));
  };

  const onGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    if (!maze || !maze.player) {
      return;
    }

    event.preventDefault();
    maze.player.reset();
    maze.size = mazeSizeInput;
    setMazeSize(maze.size);
    setCanvasSize(maze.size * CELL_SIZE);
    generateMaze();
    setMoveCount(0);
  };

  useEffect(() => {
    generateMaze();
    // eslint-disable-next-line
  }, [mazeSize]);

  return (
    <Container>
      <Wrapper>
        <MazeContainer>
          <Canvas ref={canvasRef} />
          <Generatorbox>
            <Form onSubmit={onGenerate}>
              <Label>
                Size:
                {"  "}
                <TextInput value={mazeSizeInput} onChange={onSizeChange} />
              </Label>

              <SubmitBtn>Generate New Maze</SubmitBtn>
            </Form>
          </Generatorbox>
        </MazeContainer>
        <PlayContainer canvasSize={Math.max(300, canvasSize)}>
          <ScoreBox>
            <span>Movement </span>
            <MovementCountBox>{moveCount}</MovementCountBox>
          </ScoreBox>
          <ControlPanel>
            <div></div>
            <ControlBtn value="&uarr;" onClick={() => onControlPlayer("Up")} />
            <div></div>
            <ControlBtn
              value="&larr;"
              onClick={() => onControlPlayer("Left")}
            />
            <ControlBtn
              value="&darr;"
              onClick={() => onControlPlayer("Down")}
            />
            <ControlBtn
              value="&rarr;"
              onClick={() => onControlPlayer("Right")}
            />
          </ControlPanel>
        </PlayContainer>
      </Wrapper>
    </Container>
  );
};

export default Maze;
