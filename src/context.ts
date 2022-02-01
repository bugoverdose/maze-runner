import React from "react";
import { Maze } from "./domains/Maze";

export const MazeRunnerContext = React.createContext({
  setMazeSizeInput: (_: number) => {},
  setMazeSize: (_: number) => {},
  setCanvasSize: (_: number) => {},
  maze: new Maze(),
  setMoveCount: (_: number) => {},
  setTime: (_: number) => {},
  setIsFinished: (_: boolean) => {},
});
