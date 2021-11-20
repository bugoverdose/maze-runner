import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MazeBoard } from "./domains/MazeBoard";
import { MazeBlock } from "./domains/MazeBlock";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
`;

const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
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

const PlayContainer = styled.div``;
const ScoreBox = styled.div``;

const MoveBox = styled.div`
  font-size: 20px;
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
`;

const Maze = () => {
  const [mazeSize, setMazeSize] = useState(20);
  const [mazeSizeInput, setMazeSizeInput] = useState(20);
  const CELL_SIZE = 25;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState(mazeSize * CELL_SIZE);
  const [maze] = useState(new MazeBoard(canvasSize, canvasSize, CELL_SIZE));

  const [moveCount, setMoveCount] = useState(0);

  // 미로 구조 정의 후 화면에 색칠
  const generateMaze = () => {
    if (!canvasRef.current || !maze) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.height = canvasSize;
    canvas.width = canvasSize;
    canvas.style.height = canvasSize.toString();
    canvas.style.width = canvasSize.toString();

    // 미로를 구성하는 각 네모칸들의 이중 배열 생성
    for (let col = 0; col < maze.cols; col++) {
      maze.blocks[col] = [];
      for (let row = 0; row < maze.rows; row++) {
        maze.blocks[col][row] = new MazeBlock(col, row);
      } // 디폴트로 상하좌우 벽이 있는 네모칸들 생성
    }

    let stack: MazeBlock[] = [maze.blocks[0][0]];

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
            cur.col < maze.cols - 1 &&
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
            cur.row < maze.rows - 1 &&
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

    paintMaze();
  };

  // 정의된 미로 구조를 화면에 색칠
  const paintMaze = () => {
    if (!canvasRef.current?.getContext("2d") || !maze || !maze.player) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    context.fillStyle = maze.backgroundColor;
    context.fillRect(0, 0, canvasSize, canvasSize);

    context.fillStyle = maze.endColor;
    context.fillRect(
      (maze.cols - 1) * CELL_SIZE,
      (maze.rows - 1) * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    context.strokeStyle = maze.mazeColor;
    context.strokeRect(0, 0, canvasSize, canvasSize);

    for (let col = 0; col < maze.cols; col++) {
      for (let row = 0; row < maze.rows; row++) {
        if (maze.blocks[col][row].eastWall) {
          context.beginPath();
          context.moveTo((col + 1) * CELL_SIZE, row * CELL_SIZE);
          context.lineTo((col + 1) * CELL_SIZE, (row + 1) * CELL_SIZE);
          context.stroke();
        }
        if (maze.blocks[col][row].northWall) {
          context.beginPath();
          context.moveTo(col * CELL_SIZE, row * CELL_SIZE);
          context.lineTo((col + 1) * CELL_SIZE, row * CELL_SIZE);
          context.stroke();
        }
        if (maze.blocks[col][row].southWall) {
          context.beginPath();
          context.moveTo(col * CELL_SIZE, (row + 1) * CELL_SIZE);
          context.lineTo((col + 1) * CELL_SIZE, (row + 1) * CELL_SIZE);
          context.stroke();
        }
        if (maze.blocks[col][row].westWall) {
          context.beginPath();
          context.moveTo(col * CELL_SIZE, row * CELL_SIZE);
          context.lineTo(col * CELL_SIZE, (row + 1) * CELL_SIZE);
          context.stroke();
        }
      }
    }

    context.fillStyle = maze.playerColor;
    context.fillRect(
      maze.player.col * CELL_SIZE + 2,
      maze.player.row * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
  };

  const onMovePlayer = (direction: string) => {
    if (!maze || !maze?.player) {
      return;
    }
    const playerPosition = maze.blocks[maze.player.col][maze.player.row];
    let moved = true;
    if (direction === "Left" && !playerPosition.westWall) {
      maze.player.col -= 1;
    } else if (direction === "Right" && !playerPosition.eastWall) {
      maze.player.col += 1;
    } else if (direction === "Up" && !playerPosition.northWall) {
      maze.player.row -= 1;
    } else if (direction === "Down" && !playerPosition.southWall) {
      maze.player.row += 1;
    } else {
      moved = false;
    }
    if (moved) {
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
    setMazeSize(mazeSizeInput);
    maze.player.reset();
    maze.cols = mazeSizeInput;
    maze.rows = mazeSizeInput;
    setCanvasSize(mazeSizeInput * CELL_SIZE);
    generateMaze();
    setMoveCount(0);
  };

  useEffect(() => {
    generateMaze();
    // eslint-disable-next-line
  }, [mazeSize]);

  return (
    <Container>
      <MazeContainer>
        <Canvas ref={canvasRef} />
        <Generatorbox>
          <Form onSubmit={onGenerate}>
            <Label>
              Size:
              {"  "}
              <TextInput value={mazeSizeInput} onChange={onSizeChange} />
            </Label>

            <SubmitBtn>Generate</SubmitBtn>
          </Form>
        </Generatorbox>
      </MazeContainer>
      <PlayContainer>
        <ScoreBox></ScoreBox>
        <MoveBox>
          <div>
            <span>You have moved {moveCount} times!</span>
          </div>
          <ControlPanel>
            <div></div>
            <ControlBtn value="&uarr;" onClick={() => onMovePlayer("Up")} />
            <div></div>
            <ControlBtn value="&larr;" onClick={() => onMovePlayer("Left")} />
            <ControlBtn value="&darr;" onClick={() => onMovePlayer("Down")} />
            <ControlBtn value="&rarr;" onClick={() => onMovePlayer("Right")} />
          </ControlPanel>
        </MoveBox>
      </PlayContainer>
    </Container>
  );
};

export default Maze;
