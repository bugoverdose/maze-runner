import { CreatedByText } from "./CreatedByText";
import { FooterContainer } from "./container";
import { GithubLink } from "./GithubLink";

export const Footer = () => (
  <FooterContainer>
    <CreatedByText>created by </CreatedByText>
    <GithubLink href="https://github.com/bugoverdose" target="_blank">
      @bugoverdose
    </GithubLink>
  </FooterContainer>
);
