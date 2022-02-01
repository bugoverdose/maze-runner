export {};

// import { generateMazeStructure } from "./generateMazeStructure";
// import { paintMaze } from "./paintMaze";

// export const generateMaze = ({
//   canvasRef,
//   canvasSize,
//   setMaze,
//   maze,
//   mazeSizeRef,
//   mazeRef,
//   canvasSizeRef,
// }) => {
//   if (!canvasRef.current) {
//     return;
//   }
//   const canvas: HTMLCanvasElement = canvasRef.current;

//   canvas.height = canvasSize;
//   canvas.width = canvasSize;
//   canvas.style.height = canvasSize.toString();
//   canvas.style.width = canvasSize.toString();

//   setMaze(generateMazeStructure(maze, mazeSizeRef.current));

//   paintMaze({ canvasRef, mazeRef, maze, mazeSizeRef, canvasSizeRef });
// };
