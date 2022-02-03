import styled from "styled-components";
import { PreventSelect } from "../../../styles";

export const PlayBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  ${PreventSelect}

  height: 100%;
`;
