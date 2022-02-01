import styled from "styled-components";
import { device } from "../../constants";

export const FooterContainer = styled.footer`
  // absolute은 화면이 줄어들어서 스크롤다운이 가능해졌을 때 element에 남아있음. 스크롤해도 따라오지 않음.
  position: fixed; // fixed는 화면 기준. absolute은 element 기준
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  font-weight: 600;
  background-color: white;

  padding: 4px;
  font-size: 12px;
  border-top: 1px black solid;
  border-left: 1px black solid;

  @media ${device.bigScreen} {
    padding: 10px;
    font-size: 20px;
    border-top: 2px black solid;
    border-left: 2px black solid;
  }
`;
