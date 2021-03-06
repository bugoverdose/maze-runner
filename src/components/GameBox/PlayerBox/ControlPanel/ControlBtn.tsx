import styled from "styled-components";

export const ControlBtn = styled.input.attrs({ type: "button" })`
  height: 100%;
  width: 100%;
  font-weight: 800;
  font-size: 25px;

  border-color: ${(props) => props.theme.wallColor};
`;
