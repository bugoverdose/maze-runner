import React from "react";

export const MazeRunnerContext = React.createContext({
  moveCount: 0,
  setMoveCount: (_: number) => {},

  time: 0,
  setTime: (_: number) => {},

  setIsFinished: (_: boolean) => {},
});
