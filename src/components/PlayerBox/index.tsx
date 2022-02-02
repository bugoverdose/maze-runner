import { useContext } from "react";
import { MazeRunnerContext } from "../../context";
import { Maze } from "../../domains/Maze";
import { ControlPanel } from "./ControlPanel";
import { MovementCountBox } from "./MovementCountBox";
import { PlayContainer } from "./PlayContainer";

interface iPlayerBox {
  maze: Maze;
  onControlPlayer(direction: string, maze: Maze): void;
}

export const PlayerBox = ({ maze, onControlPlayer }: iPlayerBox) => {
  const { moveCount, time } = useContext(MazeRunnerContext);

  return (
    <PlayContainer canvasSize={Math.max(300, maze.getCanvasSize())}>
      <MovementCountBox>
        <span>Moves</span>
        <div>{moveCount}</div>
        <span>{time} sec</span>
      </MovementCountBox>
      <ControlPanel onControlPlayer={onControlPlayer} maze={maze} />
    </PlayContainer>
  );
};
