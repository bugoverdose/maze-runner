import React from "react";
import { Maze } from "./domains/Maze";

export const MazeRunnerContext = React.createContext({
  maze: new Maze(),

  mazeSize: 0,
  setMazeSize: (_: number) => {},

  canvasSize: 0,
  setCanvasSize: (_: number) => {},

  moveCount: 0,
  setMoveCount: (_: number) => {},

  time: 0,
  setTime: (_: number) => {},

  setIsFinished: (_: boolean) => {},
});
