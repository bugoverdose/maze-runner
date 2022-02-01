import styled from "styled-components";

export const HelpText = styled.span`
  display: none;
  position: absolute; // align itself to the closest relative father

  border-radius: 15px;
  border: 3px black solid;
  background-color: white;
  padding: 15px;

  @media ${(props) => props.theme.device.mobile} {
    top: -160px;
    left: -150px;
  }

  @media ${(props) => props.theme.device.bigScreen} {
    top: -100px;
    left: -300px;
  }
`;
