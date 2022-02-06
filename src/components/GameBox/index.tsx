import { GameBoxContainer } from "./GameBoxContainer";
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
