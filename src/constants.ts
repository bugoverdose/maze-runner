export const INITIAL_LEVEL = 5;
export const MIN_LEVEL = 3;
export const MAX_LEVEL = 25;

const MINIMUM = 245;
// const MOBILE = 320;
const MODE_CHANGE = 425;
const BIG_SCREEN = 768;

export const RESPONSIVE_CELL_SIZE = () => {
  if (window.screen.width >= BIG_SCREEN) return 20;
  if (window.screen.width >= MODE_CHANGE) return 12;
  return 5;
};

export const width = {
  minimum: `${MINIMUM}px`,
  modeChange: `${MODE_CHANGE}px`,
};
