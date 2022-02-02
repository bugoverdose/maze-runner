import { Maze } from "../../domains/Maze";
import { MazeCanvas } from "../../domains/MazeCanvas";
import { SCanvas } from "./SCanvas";
import { MazeContainer } from "./container";
import { GeneratorForm } from "./Form";

interface iCanvas {
  maze: Maze;
}

export const Canvas = ({ maze }: iCanvas) => {
  const mazeCanvas: MazeCanvas = maze.getCanvas();
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    mazeCanvas.getCanvasRef();

  return (
    <MazeContainer>
      <SCanvas ref={canvasRef} />
      <GeneratorForm maze={maze} />
    </MazeContainer>
  );
};
