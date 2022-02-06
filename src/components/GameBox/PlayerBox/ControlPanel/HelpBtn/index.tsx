import { HelpBtnContainer } from "./container";
import { QuestionMarkLogo } from "./QuestionMarkLogo";
import { HelpText } from "./HelpText";

export const HelpBtn = () => {
  return (
    <HelpBtnContainer>
      <QuestionMarkLogo />
      <HelpText>
        Click the buttons or use your keyboard to move the red dot and reach the
        blue area!
      </HelpText>
    </HelpBtnContainer>
  );
};
