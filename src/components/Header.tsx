import styled from "styled-components";

export const Header = styled.header`
  font-weight: 800;
  font-size: 40px;

  color: ${(props) => props.theme.textColor};

  /* @media ${(props) => props.theme.device.bigScreen} {
    font-size: 50px;
  } */
`;
