import styled from "styled-components";

export const Header = styled.header`
  font-weight: 800;
  font-size: 40px;
  white-space: nowrap;

  ${(props) => props.theme.preventSelect};
`;
