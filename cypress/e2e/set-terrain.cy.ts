import { nodeTestId, testId } from "../support/selectors";
import { GRID_WIDTH_NODES, GRID_HEIGHT_NODES } from "../../src/settings/grid";

it("sets terrain", () => {
  cy.visit("/");

  cy.get(testId("select-terrain")).select("All Water");
  for (let x = 0; x < GRID_HEIGHT_NODES; x++) {
    for (let y = 0; y < GRID_WIDTH_NODES; y++) {
      cy.get(nodeTestId(x, y)).should("have.attr", "data-texture", "Infinity");
    }
  }

  cy.get(testId("select-terrain")).select("All Grass");
  for (let x = 0; x < GRID_HEIGHT_NODES; x++) {
    for (let y = 0; y < GRID_WIDTH_NODES; y++) {
      cy.get(nodeTestId(x, y)).should("have.attr", "data-texture", "5");
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
