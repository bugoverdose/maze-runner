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
    }
  }, [time, isFinished, incrementTime]);
};
