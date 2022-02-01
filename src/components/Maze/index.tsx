import { useContext, useEffect, useState } from "react";
import {
  GENERATE_NEW_MAZE,
  INITIAL_MAZE_LEVEL,
  RESPONSIVE_CELL_SIZE,
} from "../../constants";
import { MazeRunnerContext } from "../../context";
import { generateMazeStructure } from "../../utils/generateMazeStructure";
import { paintMaze } from "../../utils/paintMaze";
import { Canvas } from "./Canvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./GeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { ValueInput } from "./ValueInput";

// TODO: fix types
interface iMazeCanvas {
  setMaze: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mazeSizeRef: React.MutableRefObject<number>;
  canvasSizeRef: React.MutableRefObject<number>;
}

export const MazeCanvas = ({
  setMaze,
  canvasRef,
  mazeSizeRef,
  canvasSizeRef,
}: iMazeCanvas) => {
  const {
    maze,
    mazeSize,
    setMazeSize,

    canvasSize,
    setCanvasSize,
    setMoveCount,
    setTime,
    setIsFinished,
  } = useContext(MazeRunnerContext);

  const [mazeSizeInput, setMazeSizeInput] = useState(INITIAL_MAZE_LEVEL);

  const generateMaze = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.height = canvasSize;
    canvas.width = canvasSize;
    canvas.style.height = canvasSize.toString();
    canvas.style.width = canvasSize.toString();

    setMaze(generateMazeStructure(maze, mazeSizeRef.current));

    paintMaze({ canvasRef, maze, mazeSizeRef, canvasSizeRef });
  };

  const onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value, 10);
    if (isNaN(inputValue)) return;

    setMazeSizeInput(inputValue);
  };

  const onGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    if (!maze || !maze.player) {
      return;
    }
    event.preventDefault();

    // input 태그의 min, max 값 강제로 수정시, 5~25 범위 밖의 값 입력에 대한 방어로직
    let validMazeSize = Math.max(mazeSizeInput, 5);
    validMazeSize = Math.min(validMazeSize, 25);
    if (validMazeSize !== mazeSizeInput) {
      setMazeSizeInput(validMazeSize);
    }

    setMazeSize(validMazeSize);
    setCanvasSize(validMazeSize * RESPONSIVE_CELL_SIZE());

    maze.player.reset();
    generateMaze();

    setMoveCount(0);
    setTime(0);
    setIsFinished(false);
  };

  useEffect(() => {
    generateMaze(); // eslint-disable-next-line
  }, [mazeSize]);

  return (
    <MazeContainer>
      <Canvas ref={canvasRef} />
      <GeneratorForm onSubmit={onGenerate}>
        <label>
          Size:
          {"  "}
          <ValueInput value={mazeSizeInput} onChange={onSizeChange} />
        </label>
        <SubmitBtn>{GENERATE_NEW_MAZE}</SubmitBtn>
      </GeneratorForm>
    </MazeContainer>
  );
};
