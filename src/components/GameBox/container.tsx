import styled from "styled-components";

export const GameBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  flex-direction: column;

  @media ${(props) => props.theme.device.modeChange} {
    flex-direction: row;
  }
`;
