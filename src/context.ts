import React from "react";

export const MazeRunnerContext = React.createContext({
  time: 0,
  resetTime: () => {},

  moveCount: 0,
  setMoveCount: (_: number) => {},

  isFinished: false,
  setIsFinished: (_: boolean) => {},
});
