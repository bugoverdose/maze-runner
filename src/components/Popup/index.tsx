import { useContext } from "react";
import { MazeRunnerContext } from "../../context";
import { PopupWrapper } from "./wrapper";

interface iPopup {
  mazeSize: number;
}

export const Popup = ({ mazeSize }: iPopup) => {
  const { moveCount, time } = useContext(MazeRunnerContext);

  return (
    <PopupWrapper>
      <div>
        <div>Congratulations! </div>
        <div>
          Maze Size: {mazeSize} x {mazeSize}
        </div>
        <div>
          You have finished in {moveCount} moves and {time} seconds!
        </div>
      </div>
    </PopupWrapper>
  );
};
