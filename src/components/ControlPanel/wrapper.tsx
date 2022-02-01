import styled from "styled-components";
import { device } from "../../constants";

export const ControlPanelWrapper = styled.div`
  @media ${device.showNone} {
    display: none;
  }

  @media ${device.mobile} {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 40px);
    grid-template-rows: repeat(2, 40px);
    margin-top: 20px;
  }

  @media ${device.bigScreen} {
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(2, 50px);
    margin-top: 0px;
  }
`;
