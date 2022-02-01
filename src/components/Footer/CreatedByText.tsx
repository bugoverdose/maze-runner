import styled from "styled-components";
import { device } from "../../constants";

export const CreatedByText = styled.span`
  margin-right: 5px;

  @media ${device.mobile} {
    display: none;
  }
  @media ${device.bigScreen} {
    display: block;
  }
`;
