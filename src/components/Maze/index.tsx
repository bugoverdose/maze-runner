import { useContext } from "react";
import { GENERATE_NEW_MAZE, RESPONSIVE_CELL_SIZE } from "../../constants";
import { MazeRunnerContext } from "../../context";
import { Canvas } from "./Canvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./GeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { ValueInput } from "./ValueInput";

// TODO: fix types
interface iMaze {
  canvasRef: any;
  generateMaze: () => void;
  mazeSizeInput: any;
}

export const MazeCanvas = ({
  canvasRef,
  generateMaze,
  mazeSizeInput,
}: iMaze) => {
  const {
    setMazeSizeInput,
    setMazeSize,
    setCanvasSize,
    maze,
    setMoveCount,
    setTime,
    setIsFinished,
  } = useContext(MazeRunnerContext);

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
