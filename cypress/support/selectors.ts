export const testId = (id: string) => {
  return `[data-testid="${id}"]`;
};

export const nodeTestId = (rowIndex: number, columnIndex: number) => {
  return testId(`node-${rowIndex}-${columnIndex}`);
};
