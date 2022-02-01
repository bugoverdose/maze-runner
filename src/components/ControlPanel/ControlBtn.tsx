import styled from "styled-components";
import { device } from "../../constants";

export const ControlBtn = styled.input.attrs({ type: "button" })`
  height: 100%;
  width: 100%;
  font-weight: 800;
  font-size: 25px;

  @media ${device.bigScreen} {
    font-size: 30px;
  }
`;
