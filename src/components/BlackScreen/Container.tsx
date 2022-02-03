import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 99;

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  background-color: ${(props) => props.theme.blackOutBackgroundColor};

  @media ${(props) => props.theme.device.minimum} {
    display: none;
  }
`;
