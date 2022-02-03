import styled from "styled-components";

export const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.device.modeChange} {
    padding-right: 20px;
  }
`;
