import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    endColor: string;
    mazeColor: string;
    playerColor: string;
  }
}
