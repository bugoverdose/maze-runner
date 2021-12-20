const MOBILE = 320;
const BIG_SCREEN = 768;

export const size = {
  showNone: `0px`,
  mobile: `${MOBILE}px`,
  bigScreen: `${BIG_SCREEN}px`,
};

export const device = {
  showNone: `(min-width: ${size.showNone})`,
  mobile: `(min-width: ${size.mobile})`,
  bigScreen: `(min-width: ${size.bigScreen})`,
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

export const INITIAL_MAZE_LEVEL = 25;

export const GENERATE_NEW_MAZE = "Generate";
export const MOVEMENT = "Moves";
