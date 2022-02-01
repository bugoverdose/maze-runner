import styled from "styled-components";
import { device } from "../../constants";

export const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;

  @media ${device.bigScreen} {
    padding: 20px;
  }
`;
