import React, { useContext, useState } from "react";
import { Footer } from "./Footer";
import { Popup } from "./Popup";
import { BlackScreen } from "./BlackScreen";
import { Header } from "./Header";
import { MazeRunnerWrapper } from "./wrapper";
import { useTimerSetup, usePopup } from "../hooks";
import { MazeRunnerContext } from "../context";
import GameBox from "./GameBox";

const MazeRunner = () => {
  const { time, setTime, isFinished } = useContext(MazeRunnerContext);

  const incrementTime = (num: number) => setTime(num + 1);
  const [isPopupMode, setIsPopupMode] = useState(false);

  useTimerSetup({ isFinished, incrementTime, time });

  usePopup({ isFinished, isPopupMode, setIsPopupMode });

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
