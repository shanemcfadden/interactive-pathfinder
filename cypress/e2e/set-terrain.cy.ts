import { nodeTestId, testId } from "../support/selectors";
import { GRID_WIDTH_NODES, GRID_HEIGHT_NODES } from "../../src/settings/grid";

it("sets terrain", () => {
  cy.visit("/");

  cy.log("Sets terrain");
  cy.get(testId("select-terrain")).select("All Water");
  for (let i = 0; i < GRID_HEIGHT_NODES; i++) {
    for (let j = 0; j < GRID_WIDTH_NODES; j++) {
      cy.get(nodeTestId(i, j)).should("have.attr", "data-texture", "Infinity");
    }
  }

  cy.log("Removes terrain upon drawing texture");
  cy.get(testId("select-texture")).select("Asphalt (super easy)");

  cy.get(nodeTestId(0, 1))
    .trigger("mousedown")
    .should("have.attr", "data-texture", "1")
    .trigger("mouseup");

  cy.get(testId("select-terrain")).should("have.value", "none");
});
