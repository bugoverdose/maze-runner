import React, { useRef, useState } from "react";
import { Maze } from "../domains/Maze";
import { Footer } from "./Footer";
import { Popup } from "./Popup";
import { MazeCanvas } from "./MazeCanvas";
import { BlackScreen } from "./BlackScreen";
import { Header } from "./Header";
import { PlayerBox } from "./PlayerBox";
import { MazeRunnerContext } from "../context";
import { useTimerSetup, usePopup } from "../hooks";
import { MazeRunnerWrapper } from "./wrapper";
import { MazeRunnerContainer } from "./container";

const MazeRunner = () => {
  // user view
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maze] = useState(new Maze(canvasRef));
  const [isPopupMode, setIsPopupMode] = useState(false);

  // game data : used for logic & show on screen & triggering rerender
  const [time, setTime] = useState(0);
  const incrementTime = (num: number) => setTime(num + 1);
  const resetTime = () => setTime(0);

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

  // hooks
  useTimerSetup({ isFinished, incrementTime, time });

  usePopup({ isFinished, isPopupMode, setIsPopupMode });

  const contextObj = {
    time,
    resetTime,
    moveCount,
    setMoveCount,
    isFinished,
    setIsFinished,
  };

  return (
    <MazeRunnerContext.Provider value={contextObj}>
      <BlackScreen />
      <MazeRunnerWrapper>
        <Header>Maze Runner</Header>
        <MazeRunnerContainer>
          <MazeCanvas maze={maze} />
          <PlayerBox maze={maze} />
        </MazeRunnerContainer>
      </MazeRunnerWrapper>
      {isPopupMode && <Popup maze={maze} />}
      <Footer />
    </MazeRunnerContext.Provider>
  );
};

export default MazeRunner;
