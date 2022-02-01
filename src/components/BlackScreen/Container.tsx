import styled from "styled-components";

export const Container = styled.div`
  @media ${(props) => props.theme.device.showNone} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: ${(props) => props.theme.textColor};
  }

  ${({
    theme: {
      device: { mobile, mobileHeight },
    },
  }) => `@media ${mobile} and ${mobileHeight}`} {
    display: none;
  }
`;
