import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    wallColor: string;
    playerColor: string;
    finishColor: string;
    textColor: string;

    device: {
      showNone: string;
      mobile: string;
      mobileHeight: string;
      bigScreen: string;
    };
  }
}
