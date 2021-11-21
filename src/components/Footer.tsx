import styled from "styled-components";

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
  font-weight: 600;
  z-index: -1;
`;
const GithubLink = styled.a`
  text-decoration: none;
`;

export const Footer = () => (
  <FooterContainer>
    created by{" "}
    <GithubLink href="https://github.com/bugoverdose">
      Jeong Jinwoo(@bugoverdose)
    </GithubLink>
  </FooterContainer>
);
