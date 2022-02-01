import { MOVEMENT } from "../../constants";
import { ControlPanel } from "./ControlPanel";
import { MovementCountBox } from "./MovementCountBox";
import { PlayContainer } from "./PlayContainer";

interface iPlayerBox {
  canvasSize: number;
  moveCount: number;
  time: number;
  onControlPlayer(direction: string): void;
}

export const PlayerBox = ({
  canvasSize,
  moveCount,
  time,
  onControlPlayer,
}: iPlayerBox) => {
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
