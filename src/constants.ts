const MOBILE = 320;
const MOBILE_HEIGHT = 520;
const BIG_SCREEN = 768;

export const width = {
  showNone: `0px`,
  mobile: `${MOBILE}px`,
  bigScreen: `${BIG_SCREEN}px`,
};

export const height = {
  mobile: `${MOBILE_HEIGHT}px`,
};

export const CELL_SIZE = 15;
export const RESPONSIVE_CELL_SIZE = () => {
  if (window.screen.width >= BIG_SCREEN) {
    return 20;
  }
  if (window.screen.width >= MOBILE) {
    return 12;
  }
  return 5;
};

export const INITIAL_MAZE_LEVEL = 5;

export const GENERATE_NEW_MAZE = "Generate";
export const MOVEMENT = "Moves";
