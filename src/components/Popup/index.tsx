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
  // 팝업이 떠있는 동안에는 게임 종료 시점 데이터를 그대로 보여주도록, 재렌더링되지 않도록 getter를 실행, 혹은 setState가 호출될 수 없도록 설정.

  const level = maze.getLevel();
  // const moveCount = maze.getPlayerMoveCount();

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
