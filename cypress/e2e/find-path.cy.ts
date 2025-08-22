import { nodeTestId, testId } from "../support/selectors";

describe("Path finding", () => {
  it("finds path from start to end", () => {
    cy.visit("/");

    cy.get(testId("select-start-button")).click();
    cy.get(nodeTestId(10, 10)).click();

    cy.get(testId("select-end-button")).click();
    cy.get(nodeTestId(10, 20)).click();

    cy.clock();

    cy.get(testId("find-path-button")).contains("Find Path").click();
    cy.get(testId("cancel-path-button")).contains("Cancel");

    cy.tick(5 * 10);

    [
      [9, 10],
      [10, 9],
      [11, 10],
      [10, 11],
    ].forEach(([x, y]) => {
      cy.get(nodeTestId(x, y)).should("have.attr", "data-path-state", "1");
    });

    cy.tick(8 * 10);
    [
      [8, 10],
      [9, 11],
      [10, 12],
      [11, 11],
      [12, 10],
      [11, 9],
      [10, 8],
      [9, 9],
    ].forEach(([x, y]) => {
      cy.get(nodeTestId(x, y)).should("have.attr", "data-path-state", "1");
    });

    cy.tick(2000);

    [
      [10, 11],
      [10, 12],
      [10, 13],
      [10, 14],
      [10, 15],
      [10, 16],
      [10, 17],
      [10, 18],
      [10, 19],
    ].forEach(([x, y]) => {
      cy.get(nodeTestId(x, y)).should("have.attr", "data-path-state", "2");
    });

    cy.get(testId("reset-path-button")).contains("Reset").click();

    [
      [10, 11],
      [10, 12],
      [10, 13],
      [10, 14],
      [10, 15],
      [10, 16],
      [10, 17],
      [10, 18],
      [10, 19],
    ].forEach(([x, y]) => {
      cy.get(nodeTestId(x, y)).should("have.attr", "data-path-state", "0");
    });

    cy.get(testId("find-path-button")).contains("Find Path");
  });

  it("Fails to find path when no path exists", () => {
    cy.visit("/");

    cy.get(testId("select-terrain")).select("All Water");

    cy.get(testId("find-path-button")).contains("Find Path").click();

    cy.get(testId("modal-content")).contains("There are no possible paths!");
    cy.get(testId("modal-close-button")).contains("Reset").click();
    cy.get(testId("modal-content")).should("not.exist");

    cy.get(testId("find-path-button")).contains("Find Path").click();

    cy.get(testId("modal-content")).should("exist");
    cy.get(testId("modal-overlay")).click({ force: true });
    cy.get(testId("modal-content")).should("not.exist");
  });
});
