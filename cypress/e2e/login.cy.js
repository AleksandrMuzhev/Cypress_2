describe("authorization admin page", () => {
  const auth = require("../fixtures/auth");
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("login and pass validation", () => {
    cy.login(auth.emailValid, auth.passwordValid);
    cy.contains(auth.authorizationName).should("be.visible");
  });

  it("login invalid", () => {
    cy.login(auth.emailInvalid, auth.passwordValid);
    cy.contains(auth.errorMessage).should("be.visible");
  });

  it("Password invalid", () => {
    cy.login(auth.emailValid, auth.passwordInvalid);
    cy.contains(auth.errorMessage).should("be.visible");
  });
});
