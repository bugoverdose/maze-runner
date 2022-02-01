import React, { useRef, useState } from "react";
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
import { usePopup } from "../hooks/usePopup";

const MazeRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mazeSize, _setMazeSize] = useState(INITIAL_MAZE_LEVEL);

  const [canvasSize, _setCanvasSize] = useState(
    mazeSize * RESPONSIVE_CELL_SIZE()
  );

  const [maze, setMaze] = useState(generateMazeStructure(new Maze(), mazeSize));
  const [time, setTime] = useState(0);
  const [moveCount, _setMoveCount] = useState(0);
  const [isFinished, _setIsFinished] = useState(false);

  const moveCountRef = useRef(moveCount);
  const isFinishedRef = useRef(isFinished);
  const mazeSizeRef = useRef<number>(mazeSize);
  const canvasSizeRef = useRef(canvasSize);

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
  const setCanvasSize = (data: number) => {
    canvasSizeRef.current = data;
    _setCanvasSize(data);
  };
  const [isPopupMode, setIsPopupMode] = useState(false);

  const onControlPlayer = (direction: string) => {
    const hasMoved = movePlayer(direction, maze); // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가

    if (!hasMoved) return;

    if (!isFinishedRef.current) {
      setMoveCount(moveCountRef.current + 1);
    }

    paintMaze({ canvasRef, maze, mazeSizeRef, canvasSizeRef });

    if (
      maze.player.row === mazeSizeRef.current - 1 &&
      maze.player.col === mazeSizeRef.current - 1
    ) {
      setIsFinished(true);
    }
  };

  useTimerSetup({
    isFinished,
    incrementTime: (num: number) => setTime(num + 1),
    time,
  });

  usePopup({ isFinished, isPopupMode, setIsPopupMode });

  useKeydownControls(onControlPlayer);

  return (
    <MazeRunnerContext.Provider
      value={{
        maze,

        mazeSize,
        setMazeSize,

        canvasSize,
        setCanvasSize,

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
          <MazeCanvas
            setMaze={setMaze}
            canvasRef={canvasRef}
            mazeSizeRef={mazeSizeRef}
            canvasSizeRef={canvasSizeRef}
          />
          <PlayerBox
            canvasSize={canvasSize}
            onControlPlayer={onControlPlayer}
          />
        </MazeRunnerContainer>
      </MazeRunnerWrapper>
      {isPopupMode && <Popup mazeSize={mazeSize} />}
      <Footer />
    </MazeRunnerContext.Provider>
  );
};

export default MazeRunner;
