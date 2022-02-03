import styled from "styled-components";
import { PreventSelect } from "../../../styles";

export const PlayContainer = styled.div<{ canvasSize: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  ${PreventSelect}

  @media ${(props) => props.theme.device.bigScreen} {
    height: ${(props) => props.canvasSize + "px"};
  }
`;
