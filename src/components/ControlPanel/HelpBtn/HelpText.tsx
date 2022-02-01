import styled from "styled-components";
import { device } from "../../../constants";

export const HelpText = styled.span`
  display: none;
  position: absolute; // align itself to the closest relative father

  border-radius: 15px;
  border: 3px black solid;
  background-color: white;
  padding: 15px;

  @media ${device.mobile} {
    top: -160px;
    left: -150px;
  }

  @media ${device.bigScreen} {
    top: -100px;
    left: -300px;
  }
`;
