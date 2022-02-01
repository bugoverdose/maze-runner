import styled from "styled-components";
import { device } from "../../constants";

const { showNone, mobile, mobileHeight } = device;
export const Container = styled.div`
  @media ${showNone} {
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

  @media ${mobile} and ${mobileHeight} {
    display: none;
  }
`;
