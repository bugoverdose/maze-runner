import styled from "styled-components";
import { PreventSelect } from "../styles";

export const Header = styled.header`
  font-weight: 800;
  font-size: 40px;

  ${PreventSelect}

  color: ${(props) => props.theme.textColor};

  /* @media ${(props) => props.theme.device.bigScreen} {
    font-size: 50px;
  } */
`;
