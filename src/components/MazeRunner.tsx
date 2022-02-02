import React, { useRef, useState } from "react";
import { generateMazeStructure, movePlayer, paintMaze } from "../utils";
import { Maze } from "../domains/Maze";
import { Footer } from "./Footer";
import { Popup } from "./Popup";
import { MazeCanvas } from "./MazeCanvas";
import { BlackScreen } from "./BlackScreen";
import { MazeRunnerWrapper } from "./Wrapper";
import { Header } from "./Header";
import { PlayerBox } from "./PlayerBox";
import { MazeRunnerContainer } from "./Container";
import { MazeRunnerContext } from "../context";
import { useTimerSetup, useKeydownControls, usePopup } from "../hooks";

const MazeRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [maze, setMaze] = useState(generateMazeStructure(new Maze(canvasRef)));

  const [time, setTime] = useState(0);
  const [moveCount, _setMoveCount] = useState(0);
  const [isFinished, _setIsFinished] = useState(false);

  const moveCountRef = useRef(moveCount);
  const isFinishedRef = useRef(isFinished);

  const setMoveCount = (data: number) => {
    moveCountRef.current = data; // useRef와 useState를 일치시키기
    _setMoveCount(data); // 실제 state 값 수정
  };
  const setIsFinished = (data: boolean) => {
    isFinishedRef.current = data;
    _setIsFinished(data);
  };
  // const setCanvasSize = (data: number) => {
  //   canvasSizeRef.current = data;
  //   _setCanvasSize(data);
  // };
  const [isPopupMode, setIsPopupMode] = useState(false);

  const onControlPlayer = (direction: string, maze: Maze) => {
    const hasMoved = movePlayer(direction, maze); // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가

    if (!hasMoved) return;

    if (!isFinishedRef.current) {
      setMoveCount(moveCountRef.current + 1);
    }

    const level = maze.level;

    paintMaze({ maze });

    if (maze.player.row === level - 1 && maze.player.col === level - 1) {
      setIsFinished(true);
    }
  };

  useTimerSetup({
    isFinished,
    incrementTime: (num: number) => setTime(num + 1),
    time,
  });

  usePopup({ isFinished, isPopupMode, setIsPopupMode });

  useKeydownControls(onControlPlayer, maze);

  return (
    <MazeRunnerContext.Provider
      value={{
        moveCount,
        setMoveCount,

        time,
        setTime: (num: number) => setTime(num),

        setIsFinished,
      }}
    >
      <BlackScreen />
      <MazeRunnerWrapper>
        <Header>Maze Runner</Header>
        <MazeRunnerContainer>
          <MazeCanvas maze={maze} setMaze={setMaze} />
          <PlayerBox maze={maze} onControlPlayer={onControlPlayer} />
        </MazeRunnerContainer>
      </MazeRunnerWrapper>
      {isPopupMode && <Popup maze={maze} />}
      <Footer />
    </MazeRunnerContext.Provider>
  );
};

export default MazeRunner;
