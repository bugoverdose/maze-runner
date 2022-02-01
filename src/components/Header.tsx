import styled from "styled-components";

export const Header = styled.header`
  font-weight: 800;
  font-size: 35px;
  margin-bottom: 10px;

  @media ${(props) => props.theme.device.bigScreen} {
    font-size: 50px;
    margin-bottom: 15px;
  }
`;
