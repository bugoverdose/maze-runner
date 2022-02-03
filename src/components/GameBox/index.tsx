import { GameBoxContainer } from "./container";
import { Canvas } from "./MazeCanvas";
import { PlayerBox } from "./PlayerBox";

const GameBox = () => {
  return (
    <GameBoxContainer>
      <Canvas />
      <PlayerBox />
    </GameBoxContainer>
  );
};

export default GameBox;
