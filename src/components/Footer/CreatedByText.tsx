import styled from "styled-components";

export const CreatedByText = styled.span`
  margin-right: 5px;

  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
  @media ${(props) => props.theme.device.bigScreen} {
    display: block;
  }
`;
