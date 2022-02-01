import { useEffect } from "react";

export const useKeydownControls = (
  onControlPlayer: (direction: string) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      onControlPlayer(event.key); // "ArrowDown", "ArrowLeft", etc
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 컴포넌트 unmount 시점에 실행되는 함수
    }; // eslint-disable-next-line
  }, []);
};
