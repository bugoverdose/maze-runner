import { useContext, useEffect, useState } from "react";
import { INITIAL_MAZE_LEVEL } from "../../../constants";
import { MazeRunnerContext } from "../../../context";
import { Maze } from "../../../domains/Maze";
import { blurOnSubmit } from "../../../utils";
import { SGeneratorForm } from "./SGeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { ValueInput } from "./ValueInput";

interface iForm {
  maze: Maze;
}

export const GeneratorForm = ({ maze }: iForm) => {
  const { setMoveCount, resetTime, setIsFinished } =
    useContext(MazeRunnerContext);

  const [initGenerateMaze, setGenerateMaze] = useState(true);
  const [mazeSizeInput, setMazeSizeInput] = useState(INITIAL_MAZE_LEVEL);

  const onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value, 10);
    if (isNaN(inputValue)) return;

    setMazeSizeInput(inputValue);
  };

  const onGenerate = (event: React.FormEvent<HTMLFormElement>, maze: Maze) => {
    event.preventDefault();

    // 개발자도구로 input 태그의 min, max 값 강제로 변경시, 5~25 범위 밖의 값 입력에 대한 방어로직
    let validMazeSize = Math.max(mazeSizeInput, 5);
    validMazeSize = Math.min(validMazeSize, 25);
    if (validMazeSize !== mazeSizeInput) {
      setMazeSizeInput(validMazeSize);
    }

    maze.reset(validMazeSize);

    setGenerateMaze(true);

    resetTime();
    setMoveCount(0);
    setIsFinished(false);

    blurOnSubmit();
  };

  useEffect(() => {
    if (!initGenerateMaze) return;

    maze.generateMaze();
    setGenerateMaze(false); // eslint-disable-next-line
  }, [initGenerateMaze]);

  return (
    <SGeneratorForm onSubmit={(e) => onGenerate(e, maze)}>
      <label>
        Size:
        {"  "}
        <ValueInput value={mazeSizeInput} onChange={onSizeChange} />
      </label>
      <SubmitBtn>Generate</SubmitBtn>
    </SGeneratorForm>
  );
};
