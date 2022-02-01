import { ControlBtn } from "./ControlBtn";
import { HelpBtn } from "./HelpBtn";
import { ControlPanelWrapper } from "./wrapper";

interface iControlPanel {
  onControlPlayer(direction: string): void;
}

export const ControlPanel = ({ onControlPlayer }: iControlPanel) => {
  return (
    <ControlPanelWrapper>
      <div></div>
      <ControlBtn value="&uarr;" onClick={() => onControlPlayer("ArrowUp")} />
      <HelpBtn />
      <ControlBtn value="&larr;" onClick={() => onControlPlayer("ArrowLeft")} />
      <ControlBtn value="&darr;" onClick={() => onControlPlayer("ArrowDown")} />
      <ControlBtn
        value="&rarr;"
        onClick={() => onControlPlayer("ArrowRight")}
      />
    </ControlPanelWrapper>
  );
};
