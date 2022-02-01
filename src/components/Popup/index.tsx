import { PopupWrapper } from "./wrapper";

interface iPopup {
  mazeSize: number;
  moveCount: number;
  time: number;
}

export const Popup = ({ mazeSize, moveCount, time }: iPopup) => {
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
