# Maze Runner

- A game site where you escape from a maze that is randomly generated.

## Features

### Game

- Using the form under the maze canvas to generate a 3x3 to 25x25 size maze and start a new game.

  - Default maze size is 5x5, but player can choose the size and generate a new maze any time.

  - The BFS algorithm will always start from the finish block to make the most of the maze and increase difficulty.

  - Only square shaped maze are allowed to simplify layout.

- Move the player, the red dot, to the finish block (blue block) at the bottom right.

  - On starting a new maze, the move count and the time couner will both be set to 0. And the player will be placed at the top left block.

  - On moving the player, the move count will increment and will be shown on the screen (big screen only).

  - The passing time will be shown on the screen by seconds (big screen only).

- On reaching the finish block, a pop up will become visible to show how many moves and seconds have passed.

  - The player can move around after the game ended, but the move count and the time counter will not change until regenerating a new maze.

### Controls

- _Clicking_ the arrow key buttons on the screen will move the player.

  - If there is a wall on the direction player is trying to go to, there will be no move count increase and nothing will happen.

- _Pressing_ arrow keys **on the keyboard** will also move the player.

  - The corresponding buttons on the screen will be focused and blurred on pressing the arrow keys (because it looks cool).

  - The scrolling functionality will be prevented on pressing the arrow keys.

  - If there is a wall on the direction player is trying to go to _and if the screen can be scrolled to the direction_, the scroll event will happen.

    - The point is to prevent multiple events from happening at the same. So all the default key press events will happen if it doesn't trigger the player to move.

### Responsive Design

- Overall layout is responsive based on width.

  - If the screen is wide enough, the move count, time, and control buttons will be placed on the right of the maze canvas.

  - Otherwise, the control buttons will go under the maze and the move count and time information will be not be shown.

  - If the screen is too narrow, a dark screen will be shown to inform you. You can still move the player around and finish one game. But you won't be able to click anything on the screen and even the pop up will be placed behind the dark screen.

- Canvas has a maximum size but it is also responsive to the width, so it can decrease if the screen width decreases.

  - Increasing the _size_ of the maze has no effect on the canvas size. Therefore, the size of each maze block will decrease if maze size (or should we say _level_) increases.

- Basic instructions will become visible on hovering over the question mark icon next to the arrow key buttons.

  - The position and size of the instruction text will change on screen width size.

- The popup at the end of the game will also change on screen width size. The size of the text will also change if the screen is narrow enough.

- No element is responsive to height change because that would mess up everything. If the screen height is not enough, the user will have to scroll down.

## Enhancements

- Open graph meta tags for sharing links.

  - It's basic stuff, but I'll need to prepare some images.

- Reset position button for reseting current game without generating the entire maze.

  - It's really easy to implement, but where should we put the button?
