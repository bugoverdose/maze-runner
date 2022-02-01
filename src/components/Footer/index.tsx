import { CreatedByText } from "./CreatedByText";
import { FooterContainer } from "./FooterContainer";
import { GithubLink } from "./GithubLink";

export const Footer = () => (
  <FooterContainer>
    <CreatedByText>created by </CreatedByText>
    <GithubLink href="https://github.com/bugoverdose">@bugoverdose</GithubLink>
  </FooterContainer>
);
