import styled from "styled-components";
import { device } from "../../constants";

export const PlayContainer = styled.div<{ canvasSize: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  @media ${device.bigScreen} {
    height: ${(props) => props.canvasSize + "px"};
  }
`;
