export const testId = (id: string) => `[data-testid="${id}"]`;

export const nodeTestId = (rowIndex: number, columnIndex: number) =>
  testId(`node-${rowIndex}-${columnIndex}`);
