import { useEffect } from "react";

export const useKeyboardControls = (
  onControlPlayer: (direction: string) => boolean
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const hasMoved = onControlPlayer(event.key); // "ArrowDown", "ArrowLeft", etc

      if (hasMoved) event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 컴포넌트 unmount 시점에 실행되는 함수
    }; // eslint-disable-next-line
  }, []);
};
