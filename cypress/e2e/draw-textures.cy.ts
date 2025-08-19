import { nodeTestId, testId } from "../support/selectors";

it("Draws textures", () => {
  cy.visit("/");

  cy.log("Draw asphalt");
  cy.get(testId("select-texture")).select("Asphalt (super easy)");

  cy.get(nodeTestId(0, 0))
    .trigger("mouseover")
    .should("not.have.attr", "data-texture", "1");

  cy.get(nodeTestId(0, 1))
    .should("not.have.attr", "data-texture", "1")
    .trigger("mouseover")
    .should("not.have.attr", "data-texture", "1")
    .trigger("mousedown")
    .should("have.attr", "data-texture", "1");

  cy.get(nodeTestId(0, 2))
    .should("not.have.attr", "data-texture", "1")
    .trigger("mouseover")
    .should("have.attr", "data-texture", "1");

  cy.get(nodeTestId(0, 3))
    .should("not.have.attr", "data-texture", "1")
    .trigger("mouseover")
    .should("have.attr", "data-texture", "1");

  cy.get(nodeTestId(0, 4))
    .should("not.have.attr", "data-texture", "1")
    .trigger("mouseover")
    .should("have.attr", "data-texture", "1")
    .trigger("mouseup")
    .should("have.attr", "data-texture", "1");

  cy.get(nodeTestId(0, 5))
    .should("not.have.attr", "data-texture", "1")
    .trigger("mouseover")
    .should("not.have.attr", "data-texture", "1");

  cy.log("Draw dirt");
  cy.get(testId("select-texture")).select("Dirt (easy)");
  cy.get(nodeTestId(0, 1))
    .trigger("mousedown")
    .should("have.attr", "data-texture", "2")
    .trigger("mouseup");

  cy.log("Draw grass");
  cy.get(testId("select-texture")).select("Grass (moderate)");
  cy.get(nodeTestId(0, 2))
    .trigger("mousedown")
    .should("have.attr", "data-texture", "5")
    .trigger("mouseup");

  cy.log("Draw sand");
  cy.get(testId("select-texture")).select("Sand (difficult)");
  cy.get(nodeTestId(0, 3))
    .trigger("mousedown")
    .should("have.attr", "data-texture", "10")
    .trigger("mouseup");

  cy.log("Draw swamp");
  cy.get(testId("select-texture")).select("Swamp (super difficult)");
  cy.get(nodeTestId(0, 4))
    .trigger("mousedown")
    .should("have.attr", "data-texture", "20")
    .trigger("mouseup");

  cy.log("Draw water");
  cy.get(testId("select-texture")).select("Water (impossible)");
  cy.get(nodeTestId(0, 5))
    .trigger("mousedown")
    .should("have.attr", "data-texture", "Infinity")
    .trigger("mouseup");
});
