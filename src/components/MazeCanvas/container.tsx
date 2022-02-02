import styled from "styled-components";

export const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;

  @media ${(props) => props.theme.device.bigScreen} {
    padding: 20px;
  }
`;
