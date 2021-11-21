import styled from "styled-components";

const FooterContainer = styled.footer`
  // absolute은 화면이 줄어들어서 스크롤다운이 가능해졌을 때 element에 남아있음. 스크롤해도 따라오지 않음.
  position: fixed; // fixed는 화면 기준. absolute은 element 기준
  bottom: 0;
  right: 0;
  padding: 10px;
  font-weight: 600;
  border-top: 2px black solid;
  border-left: 2px black solid;
  background-color: white;
`;

const GithubLink = styled.a`
  text-decoration: none;
`;

export const Footer = () => (
  <FooterContainer>
    created by{" "}
    <GithubLink href="https://github.com/bugoverdose">@bugoverdose</GithubLink>
  </FooterContainer>
);
