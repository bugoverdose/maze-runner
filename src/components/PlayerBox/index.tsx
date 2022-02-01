import { useContext } from "react";
import { MOVEMENT } from "../../constants";
import { MazeRunnerContext } from "../../context";
import { ControlPanel } from "./ControlPanel";
import { MovementCountBox } from "./MovementCountBox";
import { PlayContainer } from "./PlayContainer";

interface iPlayerBox {
  canvasSize: number;
  onControlPlayer(direction: string): void;
}

export const PlayerBox = ({ canvasSize, onControlPlayer }: iPlayerBox) => {
  const { moveCount, time } = useContext(MazeRunnerContext);

  return (
    <PlayContainer canvasSize={Math.max(300, canvasSize)}>
      <MovementCountBox>
        <span>{MOVEMENT}</span>
        <div>{moveCount}</div>
        <span>{time} sec</span>
      </MovementCountBox>
      <ControlPanel onControlPlayer={onControlPlayer} />
    </PlayContainer>
  );
};
