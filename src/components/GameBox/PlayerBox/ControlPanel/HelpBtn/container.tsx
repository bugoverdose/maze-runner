import styled from "styled-components";

export const HelpBtnContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  & > svg:hover + span {
    display: block; // The adjacent sibling selector (+) selects all elements that are the adjacent siblings of a specified element
  } // svg:hover 상태면 형제인 span 태그도 드러남
`;
