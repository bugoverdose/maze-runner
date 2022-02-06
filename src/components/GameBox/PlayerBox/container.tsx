import styled from "styled-components";

export const PlayBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  ${(props) => props.theme.preventSelect};

  height: 100%;
`;
