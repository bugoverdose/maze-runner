import { useEffect } from "react";
import { blurOnSubmit, getDirectionIndex } from "../utils";

export const useKeyboardControls = (
  onControlPlayer: (direction: string) => boolean,
  refs: React.RefObject<HTMLInputElement>[] // [upKey, rightKey, downKey, leftKey]
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const directionIdx = getDirectionIndex(event.key);

      if (directionIdx === null) return;

      const targetArrowKey = refs[directionIdx].current;

      targetArrowKey?.focus();

      const hasMoved = onControlPlayer(event.key); // "ArrowDown", "ArrowLeft", etc

      if (hasMoved) event.preventDefault(); // prevent scroll event only if player has moved
    };

    const handleKeyUp = (_: KeyboardEvent) => {
      blurOnSubmit();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 컴포넌트 unmount 시점에 실행되는 함수
      window.removeEventListener("keyup", handleKeyUp);
    }; // eslint-disable-next-line
  }, []);
};
