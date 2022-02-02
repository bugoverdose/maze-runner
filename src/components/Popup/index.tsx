import { useContext } from "react";
import { MazeRunnerContext } from "../../context";
import { Maze } from "../../domains/Maze";
import { PopupWrapper } from "./wrapper";

interface iPopup {
  maze: Maze;
}

export const Popup = ({ maze }: iPopup) => {
  const { moveCount, time } = useContext(MazeRunnerContext);

  // level, moveCount, time 모두 useState의 값으로 설정하는 경우 실시간으로 재렌더링될 수 있음. (ex. 팝업이 뜬 직후 1초 증가하는 등)
  // 종료된 시점의 게임의 결과를 그대로 보여주도록, 재렌더링되지 않도록 getter를 사용.

  return (
    <PopupWrapper>
      <div>
        <div>Congratulations! </div>
        <div>
          Maze Size: {maze.getLevel()} x {maze.getLevel()}
        </div>
        <div>
          You have finished in {moveCount} moves and {time} seconds!
        </div>
      </div>
    </PopupWrapper>
  );
};
