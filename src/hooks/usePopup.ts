import { useEffect } from "react";

interface iUsePopup {
  isFinished: boolean;
  isPopupMode: boolean;
  setIsPopupMode: (_: boolean) => void;
}

export const usePopup = ({
  isFinished,
  isPopupMode,
  setIsPopupMode,
}: iUsePopup) => {
  useEffect(() => {
    if (isFinished && !isPopupMode) {
      setIsPopupMode(true);
      const closePopUp = setTimeout(() => {
        setIsPopupMode(false);
      }, 3000);
      return () => clearTimeout(closePopUp); // return a function in the useEffect callback and that function will run when the component unmounts
    } // eslint-disable-next-line
  }, [isFinished, setIsPopupMode]); // isPopupMode을 추가하는 경우 팝업 모드가 false가 될때마다 재호출되면서 절대 안 닫힘
};
