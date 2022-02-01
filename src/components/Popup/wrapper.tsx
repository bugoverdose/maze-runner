import styled from "styled-components";

export const PopupWrapper = styled.div`
  /* 대안: position: absolute; // align itself according to the closest relative father (=body) */
  position: fixed; // 스크롤 내리더라도 브라우저 화면 자체를 기준으로 최초로 렌더링된 위치에 고정
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  // pseudo selector 재활 훈련
  & > div {
    border-radius: 30px;
    border: 3px black solid;
    background-color: white;
    height: 200px;
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    & > div:first-child {
      font-size: 30px;
      margin-bottom: 25px;
    }
    & > div:not(:first-child) {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
`;
