import { useContext } from "react";
import { MazeRunnerContext } from "../../../context";
import { ControlPanel } from "./ControlPanel";
import { MovementCountBox } from "./MovementCountBox";
import { PlayContainer } from "./PlayContainer";

export const PlayerBox = () => {
  const { maze, moveCount, time } = useContext(MazeRunnerContext);

  const canvasSize: number = maze.getCanvasSize();

  return (
    <PlayContainer canvasSize={Math.max(300, canvasSize)}>
      <MovementCountBox>
        <span>Moves</span>
        <div>{moveCount}</div>
        <span>{time} sec</span>
      </MovementCountBox>
      <ControlPanel />
    </PlayContainer>
  );
};
