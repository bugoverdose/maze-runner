import styled from "styled-components";

export const GithubLink = styled.a`
  color: ${(props) => props.theme.darkPurple};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.lightPurple};
    text-decoration: none;
  }

  @media ${(props) => props.theme.device.bigScreen} {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
