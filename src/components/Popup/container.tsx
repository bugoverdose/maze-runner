import styled from "styled-components";

export const PopupContainer = styled.div`
  border-radius: 30px;
  border: 3px black solid;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 600;

  padding: 20px 25px;

  max-width: 550px;

  @media ${(props) => props.theme.device.modeChange} {
    padding: 35px 40px;
  }
`;
