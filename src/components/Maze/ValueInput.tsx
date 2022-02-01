import styled from "styled-components";

export const ValueInput = styled.input.attrs({
  required: true,
  type: "number",
  min: "5",
  max: "25",
})`
  text-align: center;
  width: 40px;
  font-size: 20px;
`;
