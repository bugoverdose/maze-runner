const MOBILE_S = 320;
const MOBILE_L = 425;
const BIG_SCREEN = 1024;

export const size = {
  mobileS: `${MOBILE_S}px`,
  mobileL: `${MOBILE_L}px`,
  bigScreen: `${BIG_SCREEN}px`,
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileL: `(min-width: ${size.mobileL})`,
  bigScreen: `(min-width: ${size.bigScreen})`,
};

export const CELL_SIZE = 15;
export const RESPONSIVE_CELL_SIZE = () => {
  if (window.screen.width >= BIG_SCREEN) {
    return 25;
  }
  if (window.screen.width >= MOBILE_L) {
    return 15;
  }
  return 10;
};

export const GENERATE_NEW_MAZE = "Generate";
export const MOVEMENT = "Moves";
