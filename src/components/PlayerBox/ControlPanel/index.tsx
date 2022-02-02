import { Maze } from "../../../domains/Maze";
import { ControlBtn } from "./ControlBtn";
import { HelpBtn } from "./HelpBtn";
import { ControlPanelWrapper } from "./wrapper";

interface iControlPanel {
  maze: Maze;
  onControlPlayer(direction: string, maze: Maze): void;
}

export const ControlPanel = ({ maze, onControlPlayer }: iControlPanel) => {
  return (
    <ControlPanelWrapper>
      <div></div>
      <ControlBtn
        value="&uarr;"
        onClick={() => onControlPlayer("ArrowUp", maze)}
      />
      <HelpBtn />
      <ControlBtn
        value="&larr;"
        onClick={() => onControlPlayer("ArrowLeft", maze)}
      />
      <ControlBtn
        value="&darr;"
        onClick={() => onControlPlayer("ArrowDown", maze)}
      />
      <ControlBtn
        value="&rarr;"
        onClick={() => onControlPlayer("ArrowRight", maze)}
      />
    </ControlPanelWrapper>
  );
};
