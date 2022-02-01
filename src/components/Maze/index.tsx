import { GENERATE_NEW_MAZE } from "../../constants";
import { Canvas } from "./Canvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./GeneratorForm";
import { SubmitBtn } from "./SubmitBtn";
import { ValueInput } from "./ValueInput";

// TODO: fix types
interface iMaze {
  canvasRef: any;
  onGenerate: any;
  mazeSizeInput: any;
  onSizeChange: any;
}

export const MazeCanvas = ({
  canvasRef,
  onGenerate,
  mazeSizeInput,
  onSizeChange,
}: iMaze) => (
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
