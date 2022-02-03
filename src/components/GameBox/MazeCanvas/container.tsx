import styled from "styled-components";

export const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 300px;

  @media ${(props) => props.theme.device.modeChange} {
    padding-right: 20px;
    max-width: 320px;
  }
`;
