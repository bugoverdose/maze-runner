import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { MazeBlock } from "./domains/MazeBlock";
import { Maze } from "./domains/Maze";
import { generateMazeStructure } from "./logic/generate-maze-structure";
import { movePlayer } from "./logic/is-movable";
import { endPosition, startPosition } from "./logic/paint-wall-info";
import {
  RESPONSIVE_CELL_SIZE,
  device,
  GENERATE_NEW_MAZE,
  MOVEMENT,
  INITIAL_MAZE_LEVEL,
} from "./constants";
import { QuestionMarkLogo } from "./components/QuestionMarkLogo";
import { Footer } from "./components/Footer";
import Popup from "./components/Popup";
import BlackScreen from "./components/BlackScreen";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.header`
  font-weight: 800;
  font-size: 35px;
  margin-bottom: 10px;

  @media ${device.bigScreen} {
    font-size: 50px;
    margin-bottom: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;

  @media ${device.mobile} {
    flex-direction: column;
  }

  @media ${device.bigScreen} {
    flex-direction: row;
  }
`;

const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;

  @media ${device.bigScreen} {
    padding: 20px;
  }
`;

const Canvas = styled.canvas`
  margin-bottom: 20px;
`;

const GeneratorForm = styled.form`
  label {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const ValueInput = styled.input.attrs({
  required: true,
  type: "number",
  min: "5",
  max: "25",
})`
  text-align: center;
  width: 40px;
  font-size: 20px;
`;

const SubmitBtn = styled.button`
  padding: 5px;
  font-size: 20px;
`;

const PlayContainer = styled.div<{ canvasSize: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  @media ${device.bigScreen} {
    height: ${(props) => props.canvasSize + "px"};
  }
`;

const MovementCountBox = styled.div`
  display: none;

  @media ${device.bigScreen} {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    & > div {
      border-radius: 15px;
      border: 3px ${(props) => props.theme.backgroundColor} solid;
      padding: 20px 30px;
      margin: 15px 0;
      font-size: 30px;
    }
  }
`;

const ControlPanel = styled.div`
  @media ${device.showNone} {
    display: none;
  }

  @media ${device.mobile} {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 40px);
    grid-template-rows: repeat(2, 40px);
    margin-top: 20px;
  }

  @media ${device.bigScreen} {
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(2, 50px);
    margin-top: 0px;
  }
`;

const ControlBtn = styled.input.attrs({ type: "button" })`
  height: 100%;
  width: 100%;
  font-weight: 800;
  font-size: 25px;

  @media ${device.bigScreen} {
    font-size: 30px;
  }
`;

const HelpBtn = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  & > svg:hover + span {
    display: block; // The adjacent sibling selector (+) selects all elements that are the adjacent siblings of a specified element
  } // svg:hover 상태면 형제인 span 태그도 드러남
`;

const HelpText = styled.span`
  display: none;
  position: absolute; // align itself to the closest relative father

  border-radius: 15px;
  border: 3px black solid;
  background-color: white;
  padding: 15px;

  @media ${device.mobile} {
    top: -160px;
    left: -150px;
  }

  @media ${device.bigScreen} {
    top: -100px;
    left: -300px;
  }
`;

const MazeRunner = () => {
  const theme = useTheme();
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

    paintMaze();
  };

  // 정의된 미로 구조를 화면에 색칠
  const paintMaze = () => {
    if (
      !canvasRef.current?.getContext("2d") ||
      !mazeRef.current ||
      !maze.player
    ) {
      return;
    }
    const curMaze = mazeRef.current;
    const curMazeSize = mazeSizeRef.current; // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가
    const curCanvasSize = canvasSizeRef.current;
    // console.log(maze, mazeSize, canvasSize);
    // console.log(curMaze, curMazeSize, canvasSizeRef, "paintMaze");

    const canvas: HTMLCanvasElement = canvasRef.current;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    // 캔버스 배경: 맨밑에 와야하므로 가장 먼저
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, curCanvasSize, curCanvasSize);

    // 목적지: 특수한 배경. 벽들에 의해 덮어져야하므로 먼저
    context.fillStyle = theme.finishColor;
    context.fillRect(
      (curMazeSize - 1) * RESPONSIVE_CELL_SIZE(),
      (curMazeSize - 1) * RESPONSIVE_CELL_SIZE(),
      RESPONSIVE_CELL_SIZE(),
      RESPONSIVE_CELL_SIZE()
    );

    // 미로 내의 벽들 색칠
    context.strokeStyle = theme.wallColor;
    context.strokeRect(0, 0, curCanvasSize, curCanvasSize);

    for (let col = 0; col < curMazeSize; col++) {
      for (let row = 0; row < curMazeSize; row++) {
        const { northWall, westWall, southWall, eastWall }: MazeBlock =
          curMaze.blocks[col][row];

        [northWall, westWall, southWall, eastWall].forEach(
          (wallExists, idx) => {
            if (wallExists) {
              const [fromCol, fromRow] = startPosition(idx, col, row);
              const [toCol, toRow] = endPosition(idx, col, row);
              context.beginPath();
              context.moveTo(
                fromCol * RESPONSIVE_CELL_SIZE(),
                fromRow * RESPONSIVE_CELL_SIZE()
              );
              context.lineTo(
                toCol * RESPONSIVE_CELL_SIZE(),
                toRow * RESPONSIVE_CELL_SIZE()
              );
              context.stroke();
            }
          }
        );
      }
    }

    // 플레이어 색칠: 원형. 목적지 위에 덮어져야 하므로 마지막에 색칠.
    context.fillStyle = theme.playerColor;
    context.strokeStyle = theme.playerColor;
    context.beginPath();
    context.arc(
      curMaze.player.col * RESPONSIVE_CELL_SIZE() + RESPONSIVE_CELL_SIZE() / 2,
      curMaze.player.row * RESPONSIVE_CELL_SIZE() + RESPONSIVE_CELL_SIZE() / 2,
      Math.floor(RESPONSIVE_CELL_SIZE() / 2) - 2,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.fill();
  };

  const onControlPlayer = (direction: string) => {
    const curMaze = mazeRef.current;
    const hasMoved = movePlayer(direction, mazeRef.current); // 키보드 입력을 위한 이벤트 리스너는 state 직접 접근 불가

    if (hasMoved) {
      if (!isFinishedRef.current) {
        setMoveCount(moveCountRef.current + 1);
      }
    }

    paintMaze();

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
      <Container>
        <Header>Maze Runner</Header>
        <Wrapper>
          <MazeContainer>
            <Canvas ref={canvasRef} />
            <GeneratorForm onSubmit={onGenerate}>
              <label>
                Size:
                {"  "}
                <ValueInput value={mazeSizeInput} onChange={onSizeChange} />
              </label>

              <SubmitBtn>{GENERATE_NEW_MAZE}</SubmitBtn>
            </GeneratorForm>
          </MazeContainer>
          <PlayContainer canvasSize={Math.max(300, canvasSize)}>
            <MovementCountBox>
              <span>{MOVEMENT}</span>
              <div>{moveCount}</div>
              <span>{time} sec</span>
            </MovementCountBox>
            <ControlPanel>
              <div></div>
              <ControlBtn
                value="&uarr;"
                onClick={() => onControlPlayer("ArrowUp")}
              />
              <HelpBtn>
                <QuestionMarkLogo />
                <HelpText>
                  Click the buttons or use your keyboard to move the red dot and
                  reach the blue area!
                </HelpText>
              </HelpBtn>
              <ControlBtn
                value="&larr;"
                onClick={() => onControlPlayer("ArrowLeft")}
              />
              <ControlBtn
                value="&darr;"
                onClick={() => onControlPlayer("ArrowDown")}
              />
              <ControlBtn
                value="&rarr;"
                onClick={() => onControlPlayer("ArrowRight")}
              />
            </ControlPanel>
          </PlayContainer>
        </Wrapper>
      </Container>

      {isPopupMode && (
        <Popup mazeSize={mazeSize} moveCount={moveCount} time={time} />
      )}
      <Footer />
    </>
  );
};

export default MazeRunner;
