import styled from "styled-components";
import { PreventSelect } from "../../../../styles";

export const SGeneratorForm = styled.form`
  ${PreventSelect}

  white-space: nowrap;

  label {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;
