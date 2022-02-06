import { useContext } from "react";
import { MazeRunnerContext } from "../../context";
import { PopupWrapper } from "./PopupWrapper";
import { PopupContainer } from "./PopupContainer";
import { CongratsText } from "./CongratsText";
import { LevelText } from "./LevelText";
import { ScoreText } from "./ScoreText";

export const Popup = () => {
  const { maze, moveCount, time } = useContext(MazeRunnerContext);

  // level, moveCount, time 모두 useState의 값으로 설정하는 경우 실시간으로 재렌더링될 수 있음. (ex. 팝업이 뜬 직후 1초 증가하는 등)
  // 팝업이 떠있는 동안에는 게임 종료 시점 데이터를 그대로 보여주도록, 재렌더링되지 않도록 getter를 실행, 혹은 setState가 호출될 수 없도록 설정.

  const level = maze.getLevel();

  return (
    <PopupWrapper>
      <PopupContainer>
        <CongratsText>Congratulations!</CongratsText>
        <LevelText>{`Maze Size: ${level} x ${level}`}</LevelText>
        <ScoreText>You have finished in</ScoreText>
        <ScoreText>{`${moveCount} moves & ${time} seconds`}</ScoreText>
      </PopupContainer>
    </PopupWrapper>
  );
};
