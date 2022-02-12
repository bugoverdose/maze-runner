import { DefaultTheme } from "styled-components";
import { PreventSelect } from "./preventSelect";
import { width } from "constants/layout";

export const theme: DefaultTheme = {
  backgroundColor: "#000000",
  wallColor: "#c8d6e5",
  playerColor: "#ff0000",
  finishColor: "#0036e7",
  blackOutBackgroundColor: "rgba(0, 0, 0, 0.8)",

  darkPurple: "#552b85",
  lightPurple: "#8768aa",

  device: {
    minimum: `(min-width: ${width.minimum})`,
    modeChange: `(min-width: ${width.modeChange})`,
  },

  preventSelect: PreventSelect,
};
