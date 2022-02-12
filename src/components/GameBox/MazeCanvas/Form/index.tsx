import { useContext, useState } from "react";
import { INITIAL_LEVEL } from "constants/logic";
import { MazeRunnerContext } from "context";
import { blurOnSubmit, toValidInput, validateInput } from "utils";
import { SGeneratorForm } from "./SGeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { LevelInput } from "./LevelInput";

export const GeneratorForm = () => {
  const { maze, setMoveCount, setTime, setIsFinished } =
    useContext(MazeRunnerContext);

  const [levelInput, setLevelInput] = useState(INITIAL_LEVEL);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value, 10);
    if (isNaN(inputValue)) return;

    setLevelInput(inputValue);
  };

  const onGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validLevel = levelInput;

    // 개발자도구로 input 태그의 min, max 속성 강제로 변경한 경우, 5~25 범위 밖의 값 입력에 대한 방어로직
    if (!validateInput(levelInput)) {
      validLevel = toValidInput(levelInput);
      setLevelInput(validLevel);
    }

    resetGame(validLevel);

    blurOnSubmit(); // input에 초점이 있는 상태로 화살표 키를 조작하면 level 값 수정되는 현상 제거
  };

  const resetGame = (validLevel: number) => {
    maze.reset(validLevel);

    maze.generateMaze();

    setTime(0);
    setMoveCount(0);
    setIsFinished(false);
  };

  return (
    <SGeneratorForm onSubmit={(e) => onGenerate(e)}>
      <label>
        Size:
        {"  "}
        <LevelInput value={levelInput} onChange={onInputChange} />
      </label>
      <SubmitBtn>Generate</SubmitBtn>
    </SGeneratorForm>
  );
};
