import React, { useEffect, useRef, useState } from "react";
import { generateMazeStructure } from "../logic/generate-maze-structure";
import { movePlayer } from "../logic/is-movable";
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
    const hasMoved = movePlayer(direction, mazeRef.current); // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가

    if (hasMoved) {
      if (!isFinishedRef.current) {
        setMoveCount(moveCountRef.current + 1);
      }
    }

    paintMaze({ canvasRef, mazeRef, maze, mazeSizeRef, canvasSizeRef });

    if (
      curMaze.player.row === mazeSizeRef.current - 1 &&
      curMaze.player.col === mazeSizeRef.current - 1
    ) {
      setIsFinished(true);
    }
  };

  const onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value, 10);
    if (isNaN(inputValue)) {
      return;
    }
    setMazeSizeInput(inputValue);
  };

  const onGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    if (!maze || !maze.player) {
      return;
    }
    event.preventDefault();

    // input 태그의 min, max 값 강제로 수정시, 5~25 범위 밖의 값 입력에 대한 방어로직
    let validMazeSize = Math.max(mazeSizeInput, 5);
    validMazeSize = Math.min(validMazeSize, 25);
    if (validMazeSize !== mazeSizeInput) {
      setMazeSizeInput(validMazeSize);
    }

    setMazeSize(validMazeSize);
    setCanvasSize(validMazeSize * RESPONSIVE_CELL_SIZE());

    maze.player.reset();
    generateMaze();

    setMoveCount(0);
    setTime(0);
    setIsFinished(false);
  };

  useEffect(() => {
    generateMaze(); // eslint-disable-next-line
  }, [mazeSize]);

  // 시간 경과 표시
  useEffect(() => {
    if (!isFinished) {
      const updateTime = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearTimeout(updateTime);
    }
  }, [time, isFinished]);

  // 목적지 도달시 잠시 동안만 팝업 토글해주기 위함
  useEffect(() => {
    if (isFinished && !isPopupMode) {
      setIsPopupMode(true);
      const closePopUp = setTimeout(() => {
        setIsPopupMode(false);
      }, 3000);
      return () => clearTimeout(closePopUp); // return a function in the useEffect callback and that function will run when the component unmounts
    } // eslint-disable-next-line
  }, [isFinished]);

  // 주의: React.KeyboardEvent 타입이 아님
  const handleKeyDown = (event: KeyboardEvent) => {
    onControlPlayer(event.key); // "ArrowDown", "ArrowLeft", etc
  };

  // 핵심: 이벤트리스너에서는 useRef에 업데이트된 현재 state값을 저장하여 접근해야 함. state 값 직접 접근 불가.
  // 주의: listener belongs to the initial render and is not updated on subsequent rerenders.
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 컴포넌트 unmount 시점에 실행되는 함수
    }; // eslint-disable-next-line
  }, []);

  return (
    <>
      <BlackScreen />
      <MazeRunnerWrapper>
        <Header>Maze Runner</Header>
        <MazeRunnerContainer>
          <MazeCanvas
            canvasRef={canvasRef}
            onGenerate={onGenerate}
            mazeSizeInput={mazeSizeInput}
            onSizeChange={onSizeChange}
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
    </>
  );
};

export default MazeRunner;
