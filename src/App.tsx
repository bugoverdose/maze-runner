import React from "react";
import { GlobalStyle } from "./styles/global";
import MazeRunner from "./components/MazeRunner";
import { ResetStyle } from "./styles/reset";

const App = () => {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <MazeRunner />
    </>
  );
};

export default App;
