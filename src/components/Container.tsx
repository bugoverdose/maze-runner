import styled from "styled-components";

export const MazeRunnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.device.bigScreen} {
    flex-direction: row;
  }
`;
