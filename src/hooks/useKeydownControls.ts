import { useEffect } from "react";
import { Maze } from "../domains/Maze";

export const useKeydownControls = (
  onControlPlayer: (direction: string, maze: Maze) => void,
  maze: Maze
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      onControlPlayer(event.key, maze); // "ArrowDown", "ArrowLeft", etc
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 컴포넌트 unmount 시점에 실행되는 함수
    }; // eslint-disable-next-line
  }, []);
};
