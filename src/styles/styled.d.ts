import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    wallColor: string;
    playerColor: string;
    finishColor: string;
    blackOutBackgroundColor: string;

    darkPurple: string;
    lightPurple: string;

    device: {
      minimum: string;
      modeChange: string;
    };

    preventSelect: FlattenSimpleInterpolation;
  }
}
