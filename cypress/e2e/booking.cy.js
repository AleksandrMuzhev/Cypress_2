import auth from "../fixtures/auth";

describe("booking tickets on movie", () => {
  it("should book a movie in an available hall", () => {
    cy.visit("/admin");
    cy.login(auth.emailValid, auth.passwordValid);

    cy.fixture("hall-control").as("hallControl");
    cy.get("@hallControl").then((hallControl) => {
      const expectedHallName = hallControl.hallNames[3];
      cy.get("#hall-control ul > li")
        .should("have.length", hallControl.hallNames.length)
        .each((element, index) => {
          cy.wrap(element)
            .invoke("text")
            .then((text) => {
              if (text.includes(expectedHallName)) {
                cy.log(
                  `Element contains the expected hall: ${expectedHallName}`
                );
                expect(text).to.equal(expectedHallName);
              }
            });
        });
    });
    cy.visit("/");
    cy.get(auth.days).eq(1).click();
    cy.get(".movie").last().contains("12:00").click();
    cy.fixture("seats").then((seats) => {
      seats.forEach((seat) => {
        cy.get(
          `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
        ).click();
      });
    });
    cy.contains(auth.ButtonBookingName).click();
    cy.contains(auth.BookingResult).should("be.visible");
  });
});
