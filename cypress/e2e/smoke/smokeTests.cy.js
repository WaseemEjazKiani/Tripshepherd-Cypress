import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe("Smoke Testing Of Tripshepherd Website As a Guest/Host", () => {
  it("Smoke Testing Of Tripshepherd Website As a GUEST", () => {
    cy.viewport(1920, 1080);
    loginAsUser();
  });

  it("Smoke Testing Of Tripshepherd Website As a HOST", () => {
    loginAsUser();
    cy.clickIfVisible('img[alt="close"]');

    //   cy.get('nav a').contains('Home').should('be.visible').click({ force: true });
    cy.get("nav a")
      .contains("Experiences")
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    //Experience Handing should be visible
    cy.get("h1.text-secondary.text-2xl.lg\\:text-3xl.font-semibold")
      .should("be.visible")
      .and("contain.text", "Experiences");

    // Three buttons inside experience menu (All + Booked + Saved) should be visible + Button should be Active
    cy.contains("button", "All")
      .should("be.visible")
      .and("have.class", "bg-secondary")
      .and("have.class", "text-black");
    cy.contains("button", "Booked").should("be.visible");
    cy.contains("button", "Saved").should("be.visible");

    //Now Clicking See All Button in Booked Experince on Main Experience Page (See All will take us to Booked Experinece Tab)
    cy.contains("h2", "Booked Experiences")
      .parent()
      .within(() => {
        cy.contains("button", "See all").should("be.visible").click();
      });
    cy.contains("button", "Booked")
      .should("be.visible")
      .and("have.class", "bg-secondary")
      .and("have.class", "text-black");

    //Move Back to All Tab From Booked Experience Tab
    cy.contains("button", "All").should("be.visible").click();

    //Now Clicking See All Button in Saved Experince on Main Experience Page (See All will take us to Saved Experinece Tab)
    cy.contains("h2", "Saved Experiences")
      .parent()
      .within(() => {
        cy.contains("button", "See all")
          .scrollIntoView()
          .should("be.visible")
          .and("have.text", "See all")
          .click();
      });

    //Move Back to All Tab From Saved Experience Tab
    cy.contains("button", "All").should("be.visible").click();

    cy.contains("div", "Global").click();
    cy.contains("div", "Turn on").click();
  });
});
