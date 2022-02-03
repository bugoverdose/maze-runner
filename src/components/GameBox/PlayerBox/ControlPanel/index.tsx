import { useContext, useRef } from "react";
import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
} from "../../../../constants";
import { MazeRunnerContext } from "../../../../context";
import { useKeyboardControls } from "../../../../hooks";
import { ControlBtn } from "./ControlBtn";
import { HelpBtn } from "./HelpBtn";
import { ControlPanelWrapper } from "./wrapper";

export const ControlPanel = () => {
  const { maze, setMoveCount, setIsFinished } = useContext(MazeRunnerContext);

  const upKeyRef = useRef<HTMLInputElement>(null);
  const rightKeyRef = useRef<HTMLInputElement>(null);
  const downKeyRef = useRef<HTMLInputElement>(null);
  const leftKeyRef = useRef<HTMLInputElement>(null);

  const onControlPlayer = (keyInput: string): boolean => {
    // 키보드 입력을 위한 이벤트 리스너는 실시간으로 변하는 state에 직접 접근하면 안 됨 => 객체에 대한 메모리 주소값을 토대로 인스턴스에서 작업을 실시하도록 호출
    const hasMoved = maze.movePlayer(keyInput);

    if (!hasMoved) return hasMoved;

    if (!maze.isFinishedRef) setMoveCount(maze.moveCountRef + 1);

    maze.paintCanvas();

    if (maze.playerAtFinishBlock()) setIsFinished(true);

    return hasMoved;
  };

  useKeyboardControls(onControlPlayer, [
    upKeyRef,
    rightKeyRef,
    downKeyRef,
    leftKeyRef,
  ]);

  return (
    <ControlPanelWrapper>
      <div></div>
      <ControlBtn
        ref={upKeyRef}
        value="&uarr;"
        onClick={() => onControlPlayer(ARROW_UP)}
      />
      <HelpBtn />
      <ControlBtn
        ref={leftKeyRef}
        value="&larr;"
        onClick={() => onControlPlayer(ARROW_LEFT)}
      />
      <ControlBtn
        ref={downKeyRef}
        value="&darr;"
        onClick={() => onControlPlayer(ARROW_DOWN)}
      />
      <ControlBtn
        ref={rightKeyRef}
        value="&rarr;"
        onClick={() => onControlPlayer(ARROW_RIGHT)}
      />
    </ControlPanelWrapper>
  );
};
