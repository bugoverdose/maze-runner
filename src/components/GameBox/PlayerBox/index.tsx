import { useContext } from "react";
import { MazeRunnerContext } from "context";
import { ControlPanel } from "./ControlPanel";
import { GameInfoBox } from "./GameInfoBox";
import { MovementCountBox } from "./MovementCountBox";
import { PlayBoxContainer } from "./PlayBoxContainer";

export const PlayerBox = () => {
  const { moveCount, time } = useContext(MazeRunnerContext);

  return (
    <PlayBoxContainer>
      <GameInfoBox>
        <span>Moves</span>
        <MovementCountBox>{moveCount}</MovementCountBox>
        <span>{time} sec</span>
      </GameInfoBox>
      <ControlPanel />
    </PlayBoxContainer>
  );
};
