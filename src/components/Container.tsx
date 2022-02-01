import styled from "styled-components";
import { device } from "../constants";

export const MazeRunnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;

  @media ${device.mobile} {
    flex-direction: column;
  }

  @media ${device.bigScreen} {
    flex-direction: row;
  }
`;
