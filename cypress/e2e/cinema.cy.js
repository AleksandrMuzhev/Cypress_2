import auth from "../fixtures/auth";

describe("tests should main page cinema", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should main page", () => {
    cy.get(auth.titlePageCinema).should("be.visible");
    cy.get(auth.days).should("have.length", 7);
  });
});
