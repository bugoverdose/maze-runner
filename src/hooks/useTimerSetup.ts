import { useEffect } from "react";

interface iUseTimer {
  isFinished: boolean;
  incrementTime: (_: number) => void;
  time: number;
}

export const useTimerSetup = ({
  isFinished,
  incrementTime,
  time,
}: iUseTimer) => {
  useEffect(() => {
    // 종착점에 도착할 때까지만 1초씩 증가.
    if (!isFinished) {
      const updateTime = setTimeout(() => {
        incrementTime(time);
      }, 1000);
      return () => clearTimeout(updateTime);
    } // eslint-disable-next-line
  }, [time, isFinished]); // incrementTime(setTime)을 추가하는 경우, 이동할 때마다 재호출되어서 시간이 증가하지 않게 됨.
};
