const testId = (id: string) => {
  return `[data-testid="${id}"]`;
};

const nodeTestId = (rowIndex: number, columnIndex: number) => {
  return testId(`node-${rowIndex}-${columnIndex}`);
};

it("Sets start and end nodes", () => {
  cy.visit("/");

  cy.log("Set Start Node");
  cy.get(testId("select-start-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(nodeTestId(0, 0))
    .should("not.contain.text", "S")
    .click()
    .should("contain.text", "S");

  cy.get(testId("select-start-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(nodeTestId(0, 1))
    .should("not.contain.text", "S")
    .click()
    .should("contain.text", "S");

  cy.get(nodeTestId(0, 0)).should("not.contain.text", "S");

  cy.get(testId("select-start-button")).should(
    "not.have.attr",
    "data-active",
    "true",
  );

  cy.log("Set End Node");
  cy.get(testId("select-end-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(nodeTestId(1, 1))
    .should("not.contain.text", "E")
    .click()
    .should("contain.text", "E");

  cy.get(testId("select-end-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(nodeTestId(1, 2))
    .should("not.contain.text", "E")
    .click()
    .should("contain.text", "E");

  cy.get(nodeTestId(1, 1)).should("not.contain.text", "E");

  cy.get(testId("select-end-button")).should(
    "not.have.attr",
    "data-active",
    "true",
  );
});
