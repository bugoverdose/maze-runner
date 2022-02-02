import { MazeCanvas } from "../../domains/MazeCanvas";
import { SCanvas } from "./SCanvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./Form";
import { useContext } from "react";
import { MazeRunnerContext } from "../../context";

export const Canvas = () => {
  const { maze } = useContext(MazeRunnerContext);

  const mazeCanvas: MazeCanvas = maze.getCanvas();
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    mazeCanvas.getCanvasRef();

  return (
    <MazeContainer>
      <SCanvas ref={canvasRef} />
      <GeneratorForm />
    </MazeContainer>
  );
};
