import styled from "styled-components";

export const ScoreText = styled.span`
  font-size: 16px;
  margin-bottom: 5px;

  text-align: center;

  @media ${(props) => props.theme.device.modeChange} {
    font-size: 20px;
  }
`;
