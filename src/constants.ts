export const INITIAL_LEVEL = 5;
export const MIN_LEVEL = 3;
export const MAX_LEVEL = 25;

export const RESPONSIVE_CELL_SIZE = () => {
  if (window.screen.width >= BIG_SCREEN) return 20;
  if (window.screen.width >= MINIMUM) return 12;
  return 5;
};

const MINIMUM = 245;
const BIG_SCREEN = 768;

export const width = {
  minimum: `${MINIMUM}px`,
  bigScreen: `${BIG_SCREEN}px`,
};
