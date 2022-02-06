import { HelpBtnContainer } from "./HelpBtnContainer";
import { QuestionMarkLogo } from "./QuestionMarkLogo";
import { HelpText } from "./HelpText";

export const HelpBtn = () => {
  return (
    <HelpBtnContainer>
      <QuestionMarkLogo />
      <HelpText>
        Click the buttons or use your keyboard to move the red blob and reach
        the blue area!
      </HelpText>
    </HelpBtnContainer>
  );
};
