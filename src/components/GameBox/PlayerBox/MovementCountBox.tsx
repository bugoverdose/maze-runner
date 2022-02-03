import styled from "styled-components";

export const MovementCountBox = styled.div`
  display: none;

  @media ${(props) => props.theme.device.bigScreen} {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    font-weight: 600;

    & > div {
      border-radius: 15px;
      border: 3px ${(props) => props.theme.backgroundColor} solid;
      padding: 20px 30px;
      margin: 15px 0;
      font-size: 30px;
    }
  }
`;
