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
    }
  }, [isFinished, isPopupMode, setIsPopupMode]);
};
