import { useContext } from "react";
import { MazeRunnerContext } from "../../../../context";
import { useKeydownControls } from "../../../../hooks";
import { ControlBtn } from "./ControlBtn";
import { HelpBtn } from "./HelpBtn";
import { ControlPanelWrapper } from "./wrapper";

export const ControlPanel = () => {
  const { maze, setMoveCount, setIsFinished } = useContext(MazeRunnerContext);

  const onControlPlayer = (keyInput: string) => {
    const hasMoved = maze.movePlayer(keyInput); // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가

    if (!hasMoved) return;

    if (!maze.isFinishedRef) setMoveCount(maze.moveCountRef + 1);

    maze.paintCanvas();

    if (maze.playerAtFinishBlock()) setIsFinished(true);
  };

  useKeydownControls(onControlPlayer);

  return (
    <ControlPanelWrapper>
      <div></div>
      <ControlBtn value="&uarr;" onClick={() => onControlPlayer("ArrowUp")} />
      <HelpBtn />
      <ControlBtn value="&larr;" onClick={() => onControlPlayer("ArrowLeft")} />
      <ControlBtn value="&darr;" onClick={() => onControlPlayer("ArrowDown")} />
      <ControlBtn
        value="&rarr;"
        onClick={() => onControlPlayer("ArrowRight")}
      />
    </ControlPanelWrapper>
  );
};
