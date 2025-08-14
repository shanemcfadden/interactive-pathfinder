const testId = ([id]: TemplateStringsArray) => {
  return `[data-testid="${id}"]`;
};

it("Sets start and end nodes", () => {
  cy.visit("/");
  cy.get(testId`node-0-0`).should("not.contain.text", "S");

  cy.get(testId`select-start-button`).click();
  cy.get(testId`node-0-0`)
    .click()
    .should("contain.text", "S");

  cy.get(testId`node-0-1`).should("not.contain.text", "S");
  cy.get(testId`select-start-button`).click();
  cy.get(testId`node-0-1`)
    .click()
    .should("contain.text", "S");
  cy.get(testId`node-0-0`).should("not.contain.text", "S");

  cy.get(testId`node-1-1`).should("not.contain.text", "E");
  cy.get(testId`select-end-button`).click();
  cy.get(testId`node-1-1`)
    .click()
    .should("contain.text", "E");

  cy.get(testId`node-1-2`).should("not.contain.text", "E");
  cy.get(testId`select-end-button`).click();
  cy.get(testId`node-1-2`)
    .click()
    .should("contain.text", "E");
  cy.get(testId`node-1-1`).should("not.contain.text", "E");
});
