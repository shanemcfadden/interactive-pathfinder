import { testId, nodeTestId } from "../support/selectors";

it("Sets start and end nodes", () => {
  cy.visit("/");

  cy.log("Set Start Node");
  cy.get(testId("select-start-button"))
    .contains("Select Start")
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
    .contains("Select End")
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

  cy.log("Allow changing user action");
  cy.get(testId("select-start-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(testId("select-end-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(nodeTestId(2, 2))
    .should("not.contain.text", "E")
    .should("not.contain.text", "S")
    .click()
    .should("contain.text", "E");

  cy.get(testId("select-end-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(testId("select-start-button"))
    .should("not.have.attr", "data-active", "true")
    .click()
    .should("have.attr", "data-active", "true");

  cy.get(nodeTestId(3, 3))
    .should("not.contain.text", "E")
    .should("not.contain.text", "S")
    .click()
    .should("contain.text", "S");

  cy.log("Should not allow setting start and end nodes on the same cell");

  cy.get(testId("select-start-button")).click();

  cy.get(nodeTestId(2, 2))
    .should("contain.text", "E")
    .click()
    .should("contain.text", "E");

  cy.get(testId("select-start-button")).should(
    "not.have.attr",
    "data-active",
    "true",
  );

  cy.get(testId("select-end-button")).click();

  cy.get(nodeTestId(3, 3))
    .should("contain.text", "S")
    .click()
    .should("contain.text", "S");
});
