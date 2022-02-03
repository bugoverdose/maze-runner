import styled from "styled-components";

export const LevelText = styled.span`
  font-size: 16px;
  margin-bottom: 15px;

  @media ${(props) => props.theme.device.modeChange} {
    font-size: 20px;
  }
`;
