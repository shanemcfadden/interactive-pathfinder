it("visits home page", () => {
  cy.visit("/");
  cy.contains("Interactive Pathfinder");
});

