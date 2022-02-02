export const blurOnSubmit = () => {
  const activeElement = document.activeElement as HTMLElement | null;
  activeElement?.blur();
};
