import styled from "styled-components";

export const CongratsText = styled.span`
  font-size: 24px;
  margin-bottom: 25px;

  @media ${(props) => props.theme.device.modeChange} {
    font-size: 30px;
  }
`;
