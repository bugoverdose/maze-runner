import { useState } from "react";
import { GlobalStyle } from "../styles/global";
import MazeRunner from "./MazeRunner";
import { ResetStyle } from "../styles/reset";
import { Maze } from "../domains/Maze";
import { MazeRunnerContext } from "../context";

const App = () => {
  const [maze] = useState(new Maze());

  const [time, setTime] = useState(0);

  const [moveCount, _setMoveCount] = useState(0);
  const setMoveCount = (data: number) => {
    maze.moveCountRef = data; // ref와 useState를 일치시키기
    _setMoveCount(data); // 실제 state 값 수정
  };

  const [isFinished, _setIsFinished] = useState(false);
  const setIsFinished = (data: boolean) => {
    maze.isFinishedRef = data;
    _setIsFinished(data);
  };

  const contextObj = {
    maze,
    time,
    setTime,
    moveCount,
    setMoveCount,
    isFinished,
    setIsFinished,
  };

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <MazeRunnerContext.Provider value={contextObj}>
        <MazeRunner />
      </MazeRunnerContext.Provider>
    </>
  );
};

export default App;
