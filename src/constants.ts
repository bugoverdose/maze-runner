export const INITIAL_LEVEL = 5;
export const MIN_LEVEL = 3;
export const MAX_LEVEL = 25;

export const RESPONSIVE_CELL_SIZE = () => {
  if (window.screen.width >= BIG_SCREEN) {
    return 20;
  }
  if (window.screen.width >= MOBILE) {
    return 12;
  }
  return 5;
};

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
