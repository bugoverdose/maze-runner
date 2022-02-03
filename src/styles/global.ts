import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  button, input[type="button"] {
    color: #ffffff;
    background-color: ${(props) => props.theme.backgroundColor};

    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.darkPurple};
    }

    &:active {
      background-color: ${(props) => props.theme.lightPurple};
      border-color: ${(props) => props.theme.lightPurple};
    }
  }
`;
