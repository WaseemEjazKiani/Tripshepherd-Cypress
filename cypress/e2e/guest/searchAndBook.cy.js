import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe.skip("GUEST: Search & Book Experience", () => {
  it("Search and book experience Test", () => {
    const searchText = "buhuhuh uh";

    loginAsUser();

    cy.get("nav a")
      .contains("Search")
      .should("be.visible")
      .click({ force: true });

    cy.log("Clicked on Search");

    cy.get('input[placeholder="Search"][type="text"]')
      .should("be.visible")
      .type(`${searchText}{enter}`);

    cy.wait(2000); // Optional wait for search results to load

    cy.get("div.grid.grid-cols-3 a").then(($items) => {
      const match = [...$items].find(
        (item) =>
          item.querySelector("h3")?.textContent.trim().toLowerCase() ===
          searchText.toLowerCase()
      );

      if (match) {
        cy.wrap(match).invoke("removeAttr", "target").click();
        cy.log("✅ Clicked the matching item");
      }

      // Press the next Button
      cy.get("span.text-black.text-sm")
        .contains("Choose Time")
        .then(($el) => {
          if ($el.length > 0 && $el.is(":visible")) {
            cy.wrap($el).scrollIntoView().click({ force: true });
          } else {
            cy.log('ℹ️ "Next" button not visible — continuing');
          }
        });
    });

    cy.get('tbody.rdp-weeks td[data-disabled!="true"] button')
      .first()
      .click({ force: true });

    // Press the Choose Time Button
    cy.get("span.text-black.font-medium.font-sfpro")
      .contains("Choose time")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Choose time" button not visible — continuing');
        }
      });

    // Press the Book Button
    cy.get("span.text-black.font-medium.font-sfpro")
      .contains("Book")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Book" button not visible — continuing');
        }
      });

    cy.get("div.bg-primary").contains("Continue").click({ force: true });

    cy.get('iframe[title="Secure payment input frame"]', {
      timeout: 20000,
    }).should("be.visible");
    cy.wait(10000); // Optional
  });
});
