import styled from "styled-components";

export const CreatedByText = styled.span`
  margin-right: 5px;

  display: none;

  @media ${(props) => props.theme.device.bigScreen} {
    display: block;
  }
`;
