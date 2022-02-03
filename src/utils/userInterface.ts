import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../constants";

export const blurOnSubmit = () => {
  const activeElement = document.activeElement as HTMLElement | null;
  activeElement?.blur();
};

export const validateInput = (levelInput: number) => {
  return MIN_LEVEL <= levelInput && levelInput <= MAX_LEVEL;
};

export const toValidInput = (levelInput: number) => {
  let validMazeSize = Math.max(levelInput, MIN_LEVEL);
  validMazeSize = Math.min(validMazeSize, MAX_LEVEL);

  return validMazeSize;
};

export const getDirectionIndex = (keyInput: string) => {
  if (keyInput === ARROW_UP) return 0;
  if (keyInput === ARROW_RIGHT) return 1;
  if (keyInput === ARROW_DOWN) return 2;
  if (keyInput === ARROW_LEFT) return 3;

  return null;
};
