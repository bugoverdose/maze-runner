import { useContext, useEffect, useState } from "react";
import { INITIAL_MAZE_LEVEL } from "../../constants";
import { MazeRunnerContext } from "../../context";
import { Maze } from "../../domains/Maze";
import { blurOnSubmit } from "../../utils";
import { Canvas } from "./Canvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./GeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { ValueInput } from "./ValueInput";

// TODO: fix types
interface iMazeCanvas {
  maze: Maze;
  setMaze: any;
}

export const MazeCanvas = ({ maze, setMaze }: iMazeCanvas) => {
  const { setMoveCount, setTime, setIsFinished } =
    useContext(MazeRunnerContext);

  const canvasRef: React.RefObject<HTMLCanvasElement> = maze.getCanvasRef();

  const [initGenerateMaze, setGenerateMaze] = useState(true);
  const [mazeSizeInput, setMazeSizeInput] = useState(INITIAL_MAZE_LEVEL);

  const generateMaze = () => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    const canvasSize = maze.getCanvasSize();

    canvas.height = canvasSize;
    canvas.width = canvasSize;
    canvas.style.height = canvasSize.toString();
    canvas.style.width = canvasSize.toString();

    maze.generateMazeStructure();
    setMaze(maze);

    maze.paintCanvas();
  };

  const onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value, 10);
    if (isNaN(inputValue)) return;

    setMazeSizeInput(inputValue);
  };

  const onGenerate = (event: React.FormEvent<HTMLFormElement>, maze: Maze) => {
    event.preventDefault();

    // input 태그의 min, max 값 강제로 수정시, 5~25 범위 밖의 값 입력에 대한 방어로직
    let validMazeSize = Math.max(mazeSizeInput, 5);
    validMazeSize = Math.min(validMazeSize, 25);
    if (validMazeSize !== mazeSizeInput) {
      setMazeSizeInput(validMazeSize);
    }

    maze.reset(validMazeSize);

    setGenerateMaze(true);

    setMoveCount(0);
    setTime(0);
    setIsFinished(false);

    blurOnSubmit();
  };

  useEffect(() => {
    if (!initGenerateMaze) return;

    generateMaze();
    setGenerateMaze(false); // eslint-disable-next-line
  }, [initGenerateMaze]);

  return (
    <MazeContainer>
      <Canvas ref={canvasRef} />
      <GeneratorForm onSubmit={(e) => onGenerate(e, maze)}>
        <label>
          Size:
          {"  "}
          <ValueInput
            id="level-input"
            value={mazeSizeInput}
            onChange={onSizeChange}
          />
        </label>
        <SubmitBtn>Generate</SubmitBtn>
      </GeneratorForm>
    </MazeContainer>
  );
};
