import { useContext, useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Popup } from "./Popup";
import { BlackScreen } from "./BlackScreen";
import { Header } from "./Header";
import { MazeRunnerWrapper } from "./MazeRunnerWrapper";
import { useTimerSetup, usePopup } from "../hooks";
import { MazeRunnerContext } from "../context";
import GameBox from "./GameBox";

const MazeRunner = () => {
  const { maze, time, setTime, isFinished } = useContext(MazeRunnerContext);

  const incrementTime = (num: number) => setTime(num + 1);
  const [isPopupMode, setIsPopupMode] = useState(false);

  useTimerSetup({ isFinished, incrementTime, time });

  usePopup({ isFinished, isPopupMode, setIsPopupMode });

  useEffect(() => {
    // initialize maze structure & paint it on canvas on page load
    maze.generateMaze(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <MazeRunnerWrapper>
        <Header>Maze Runner</Header>
        <GameBox />
        <Footer />
      </MazeRunnerWrapper>
      <BlackScreen />
      {isPopupMode && <Popup />}
    </>
  );
};

export default MazeRunner;
