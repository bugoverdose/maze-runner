import React, { useContext, useState } from "react";
import { Footer } from "./Footer";
import { Popup } from "./Popup";
import { Canvas } from "./MazeCanvas";
import { BlackScreen } from "./BlackScreen";
import { Header } from "./Header";
import { PlayerBox } from "./PlayerBox";
import { MazeRunnerWrapper } from "./wrapper";
import { MazeRunnerContainer } from "./container";
import { useTimerSetup, usePopup } from "../hooks";
import { MazeRunnerContext } from "../context";

const MazeRunner = () => {
  const { time, setTime, isFinished } = useContext(MazeRunnerContext);

  const incrementTime = (num: number) => setTime(num + 1);
  const [isPopupMode, setIsPopupMode] = useState(false);

  useTimerSetup({ isFinished, incrementTime, time });

  usePopup({ isFinished, isPopupMode, setIsPopupMode });

  return (
    <>
      <BlackScreen />
      <MazeRunnerWrapper>
        <Header>Maze Runner</Header>
        <MazeRunnerContainer>
          <Canvas />
          <PlayerBox />
        </MazeRunnerContainer>
      </MazeRunnerWrapper>
      {isPopupMode && <Popup />}
      <Footer />
    </>
  );
};

export default MazeRunner;
