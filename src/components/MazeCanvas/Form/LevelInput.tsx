import styled from "styled-components";
import { MAX_LEVEL, MIN_LEVEL } from "../../../constants";

export const LevelInput = styled.input.attrs({
  required: true,
  type: "number",
  min: `${MIN_LEVEL}`,
  max: `${MAX_LEVEL}`,
})`
  text-align: center;
  width: 40px;
  font-size: 20px;
`;