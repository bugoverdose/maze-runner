import { DefaultTheme } from "styled-components";
import { width } from "../constants";

export const theme: DefaultTheme = {
  backgroundColor: "#000000",
  wallColor: "#c8d6e5",
  playerColor: "#ff0000",
  finishColor: "#00eaff",
  blackOutBackgroundColor: "rgba(0, 0, 0, 0.8)",

  darkPurple: "#552b85",
  lightPurple: "#8768aa",

  device: {
    minimum: `(min-width: ${width.minimum})`,
    modeChange: `(min-width: ${width.modeChange})`,
  },
};
