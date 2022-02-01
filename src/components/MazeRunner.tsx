import React, { useEffect, useRef, useState } from "react";
import { generateMazeStructure } from "../utils/generateMazeStructure";
import { movePlayer } from "../utils/movePlayer";
import { RESPONSIVE_CELL_SIZE, INITIAL_MAZE_LEVEL } from "../constants";
import { Maze } from "../domains/Maze";
import { Footer } from "./Footer";
import { Popup } from "./Popup";
import { MazeCanvas } from "./Maze";
import { BlackScreen } from "./BlackScreen";
import { MazeRunnerWrapper } from "./Wrapper";
import { Header } from "./Header";
import { PlayerBox } from "./PlayerBox";
import { MazeRunnerContainer } from "./Container";
import { paintMaze } from "../utils/paintMaze";
import { MazeRunnerContext } from "../context";
import { useTimerSetup } from "../hooks/useTimerSetup";
import { useKeydownControls } from "../hooks/useKeydownControls";

const MazeRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mazeSize, _setMazeSize] = useState(INITIAL_MAZE_LEVEL);
  const [mazeSizeInput, setMazeSizeInput] = useState(INITIAL_MAZE_LEVEL);

  const [canvasSize, _setCanvasSize] = useState(
    mazeSize * RESPONSIVE_CELL_SIZE()
  );

  const [maze, _setMaze] = useState(
    generateMazeStructure(new Maze(), mazeSize)
  );
  const [time, setTime] = useState(0);
  const [moveCount, _setMoveCount] = useState(0);
  const [isFinished, _setIsFinished] = useState(false);

  // 이벤트리스너에서는 업데이트된 state 값 접근 불가 => useRef를 업데이트하여 접근
  const moveCountRef = React.useRef(moveCount);
  const isFinishedRef = React.useRef(isFinished);
  const mazeSizeRef = React.useRef(mazeSize);
  const mazeRef = React.useRef(maze);
  const canvasSizeRef = React.useRef(canvasSize);

  const setMoveCount = (data: number) => {
    moveCountRef.current = data; // useRef와 useState를 일치시키기
    _setMoveCount(data); // 실제 state 값 수정
  };
  const setIsFinished = (data: boolean) => {
    isFinishedRef.current = data;
    _setIsFinished(data);
  };
  const setMazeSize = (data: number) => {
    mazeSizeRef.current = data;
    _setMazeSize(data);
  };
  const setMaze = (data: Maze) => {
    _setMaze(data);
  };
  const setCanvasSize = (data: number) => {
    canvasSizeRef.current = data;
    _setCanvasSize(data);
  };
  const [isPopupMode, setIsPopupMode] = useState(false);

  // 미로 구조 정의 후 화면에 색칠
  const generateMaze = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.height = canvasSize;
    canvas.width = canvasSize;
    canvas.style.height = canvasSize.toString();
    canvas.style.width = canvasSize.toString();

    setMaze(generateMazeStructure(maze, mazeSizeRef.current));

    paintMaze({ canvasRef, mazeRef, maze, mazeSizeRef, canvasSizeRef });
  };

  const onControlPlayer = (direction: string) => {
    const curMaze = mazeRef.current;
    const hasMoved = movePlayer(direction, curMaze); // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가

    if (!hasMoved) return;

    if (!isFinishedRef.current) {
      setMoveCount(moveCountRef.current + 1);
    }

    paintMaze({ canvasRef, mazeRef, maze, mazeSizeRef, canvasSizeRef });

    if (
      curMaze.player.row === mazeSizeRef.current - 1 &&
      curMaze.player.col === mazeSizeRef.current - 1
    ) {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    generateMaze(); // eslint-disable-next-line
  }, [mazeSize]);

  useTimerSetup({
    isFinished,
    incrementTime: (num: number) => setTime(num + 1),
    time,
  });

  // 목적지 도달시 잠시 동안만 팝업 토글해주기 위함
  useEffect(() => {
    if (isFinished && !isPopupMode) {
      setIsPopupMode(true);
      const closePopUp = setTimeout(() => {
        setIsPopupMode(false);
      }, 3000);
      return () => clearTimeout(closePopUp); // return a function in the useEffect callback and that function will run when the component unmounts
    }
  }, [isFinished, isPopupMode]);

  useKeydownControls(onControlPlayer);

  return (
    <MazeRunnerContext.Provider
      value={{
        setMazeSizeInput: (num: number) => setMazeSizeInput(num),
        setMazeSize,
        setCanvasSize,
        maze,
        setMoveCount,
        setTime: (num: number) => setTime(num),
        setIsFinished,
      }}
    >
      <BlackScreen />
      <MazeRunnerWrapper>
        <Header>Maze Runner</Header>
        <MazeRunnerContainer>
          <MazeCanvas
            canvasRef={canvasRef}
            generateMaze={generateMaze}
            mazeSizeInput={mazeSizeInput}
          />
          <PlayerBox
            canvasSize={canvasSize}
            moveCount={moveCount}
            time={time}
            onControlPlayer={onControlPlayer}
          />
        </MazeRunnerContainer>
      </MazeRunnerWrapper>
      {isPopupMode && (
        <Popup mazeSize={mazeSize} moveCount={moveCount} time={time} />
      )}
      <Footer />
    </MazeRunnerContext.Provider>
  );
};

export default MazeRunner;
