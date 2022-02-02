import { MAX_LEVEL, MIN_LEVEL } from "../constants";

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
