import styled from "styled-components";
import { PreventSelect } from "../../styles";

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: end;

  font-weight: 600;
  background-color: white;

  font-size: 20px;
  padding: 10px 0px;

  ${PreventSelect}

  @media ${(props) => props.theme.device.minimum} {
    padding: 10px 20px 10px 0px;
  }
`;
