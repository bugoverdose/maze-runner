import { SCanvas } from "./SCanvas";
import { MazeContainer } from "./MazeContainer";
import { GeneratorForm } from "./Form";
import { useContext } from "react";
import { MazeRunnerContext } from "context";

export const Canvas = () => {
  const { maze } = useContext(MazeRunnerContext);

  const canvasRef = maze.getCanvasRef();

  return (
    <MazeContainer>
      <SCanvas ref={canvasRef} />
      <GeneratorForm />
    </MazeContainer>
  );
};
