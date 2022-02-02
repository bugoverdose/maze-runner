import { useContext } from "react";
import { MazeRunnerContext } from "../../context";
import { Maze } from "../../domains/Maze";
import { ControlPanel } from "./ControlPanel";
import { MovementCountBox } from "./MovementCountBox";
import { PlayContainer } from "./PlayContainer";

interface iPlayerBox {
  maze: Maze;
}

export const PlayerBox = ({ maze }: iPlayerBox) => {
  const { moveCount, time } = useContext(MazeRunnerContext);

  const canvasSize: number = maze.getCanvas().getCanvasSize();

  return (
    <PlayContainer canvasSize={Math.max(300, canvasSize)}>
      <MovementCountBox>
        <span>Moves</span>
        <div>{moveCount}</div>
        <span>{time} sec</span>
      </MovementCountBox>
      <ControlPanel maze={maze} />
    </PlayContainer>
  );
};
