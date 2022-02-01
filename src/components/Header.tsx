import styled from "styled-components";
import { device } from "../constants";

export const Header = styled.header`
  font-weight: 800;
  font-size: 35px;
  margin-bottom: 10px;

  @media ${device.bigScreen} {
    font-size: 50px;
    margin-bottom: 15px;
  }
`;
