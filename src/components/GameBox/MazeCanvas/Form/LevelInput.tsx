import styled from "styled-components";
import { MAX_LEVEL, MIN_LEVEL } from "constants/logic";

export const LevelInput = styled.input.attrs({
  required: true,
  type: "number",
  min: `${MIN_LEVEL}`,
  max: `${MAX_LEVEL}`,
})`
  text-align: center;
  width: 50px;
  font-size: 20px;
`;
