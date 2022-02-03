import styled from "styled-components";

export const ControlPanelWrapper = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: repeat(2, 40px);
  margin-top: 20px;

  @media ${(props) => props.theme.device.bigScreen} {
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(2, 50px);
  }
`;
