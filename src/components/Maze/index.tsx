import { useContext } from "react";
import { GENERATE_NEW_MAZE } from "../../constants";
import { MazeRunnerContext } from "../../context";
import { Canvas } from "./Canvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./GeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { ValueInput } from "./ValueInput";

// TODO: fix types
interface iMaze {
  canvasRef: any;
  onGenerate(event: React.FormEvent<HTMLFormElement>): void;
  mazeSizeInput: any;
}

export const MazeCanvas = ({ canvasRef, onGenerate, mazeSizeInput }: iMaze) => {
  const { setMazeSizeInput } = useContext(MazeRunnerContext);

  const onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value, 10);
    if (isNaN(inputValue)) return;

    setMazeSizeInput(inputValue);
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
