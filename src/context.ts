import { createContext } from "react";
import { Maze } from "./domains/Maze";

export const MazeRunnerContext = createContext({
  maze: new Maze(),

  time: 0,
  setTime: (_: number) => {},

  moveCount: 0,
  setMoveCount: (_: number) => {},

  isFinished: false,
  setIsFinished: (_: boolean) => {},
});
