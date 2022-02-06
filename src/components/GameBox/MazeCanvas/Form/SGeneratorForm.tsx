import styled from "styled-components";

export const SGeneratorForm = styled.form`
  ${(props) => props.theme.preventSelect};

  white-space: nowrap;

  label {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;
