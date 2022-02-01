import { DefaultTheme } from "styled-components";
import { height, width } from "../constants";

export const theme: DefaultTheme = {
  backgroundColor: "#000000",
  wallColor: "#c8d6e5",
  playerColor: "#ff0000",
  finishColor: "#00eaff",
  textColor: "rgba(0, 0, 0, 0.8)",

  device: {
    showNone: `(min-width: ${width.showNone})`,
    mobile: `(min-width: ${width.mobile})`,
    mobileHeight: `(min-height: ${height.mobile})`,
    bigScreen: `(min-width: ${width.bigScreen})`,
  },
};

// ${(props) => props.theme.textColor}
// ${(props) => props.theme.device.bigScreen}
