import React from "react";
import { GlobalStyle } from "./styles/global";
import MazeRunner from "./components/MazeRunner";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <MazeRunner />
    </>
  );
};

export default App;
