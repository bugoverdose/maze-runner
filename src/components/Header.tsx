import styled from "styled-components";
import { PreventSelect } from "../styles";

export const Header = styled.header`
  font-weight: 800;
  font-size: 40px;
  white-space: nowrap;

  ${PreventSelect}

  color: ${(props) => props.theme.textColor};
`;
