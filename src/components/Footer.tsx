import styled from "styled-components";
import { device } from "../styles/constants";

const FooterContainer = styled.footer`
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

const CreatedByText = styled.span`
  margin-right: 5px;

  @media ${device.mobile} {
    display: none;
  }
  @media ${device.bigScreen} {
    display: block;
  }
`;

const GithubLink = styled.a`
  text-decoration: none;
`;

export const Footer = () => (
  <FooterContainer>
    <CreatedByText>created by </CreatedByText>
    <GithubLink href="https://github.com/bugoverdose">@bugoverdose</GithubLink>
  </FooterContainer>
);
