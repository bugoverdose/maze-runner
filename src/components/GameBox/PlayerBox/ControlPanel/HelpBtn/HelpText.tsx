import styled from "styled-components";

export const HelpText = styled.span`
  display: none;

  border-radius: 15px;
  border: 3px black solid;
  background-color: white;
  padding: 15px;

  width: 250px;

  position: absolute; // align itself to the closest relative father

  top: -120px;
  left: -150px;

  @media ${(props) => props.theme.device.modeChange} {
    width: auto;

    top: -100px;
    left: -300px;
  }
`;
