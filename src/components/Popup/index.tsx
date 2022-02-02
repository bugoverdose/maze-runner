import { useContext } from "react";
import { MazeRunnerContext } from "../../context";
import { PopupWrapper } from "./wrapper";

export const Popup = () => {
  const { level, moveCount, time } = useContext(MazeRunnerContext);

  return (
    <PopupWrapper>
      <div>
        <div>Congratulations! </div>
        <div>
          Maze Size: {level} x {level}
        </div>
        <div>
          You have finished in {moveCount} moves and {time} seconds!
        </div>
      </div>
    </PopupWrapper>
  );
};
