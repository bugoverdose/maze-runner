import React, { createRef } from "react";
import { Maze } from "./domains/Maze";

export const MazeRunnerContext = React.createContext({
  maze: new Maze(createRef()),

  time: 0,
  setTime: (_: number) => {},

  moveCount: 0,
  setMoveCount: (_: number) => {},

  isFinished: false,
  setIsFinished: (_: boolean) => {},
});
