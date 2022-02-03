import styled from "styled-components";

export const GameInfoBox = styled.div`
  display: none;

  @media ${(props) => props.theme.device.bigScreen} {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 25px;
    font-weight: 600;
  }
`;
