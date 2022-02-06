import styled from "styled-components";

export const PopupWrapper = styled.div`
  position: fixed; // 스크롤 내리더라도 브라우저 화면 자체를 기준으로 최초로 렌더링된 위치에 고정
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  z-index: 80;

  ${(props) => props.theme.preventSelect};

  background-color: ${(props) => props.theme.blackOutBackgroundColor};

  @media ${(props) => props.theme.device.modeChange} {
    padding: 30px;
  }
`;
