import styled from "styled-components";

export const MazeRunnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;

  padding: 50px 0;

  @media ${(props) => props.theme.device.minimum} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.device.bigScreen} {
    flex-direction: row;
  }
`;
