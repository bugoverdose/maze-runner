import { BlackScreenContainer } from "./BlackScreenContainer";
import { WarningText } from "./WarningText";

export const BlackScreen = () => {
  return (
    <BlackScreenContainer>
      <WarningText>Your Screen</WarningText>
      <WarningText>Is Too Small!</WarningText>
    </BlackScreenContainer>
  );
};
