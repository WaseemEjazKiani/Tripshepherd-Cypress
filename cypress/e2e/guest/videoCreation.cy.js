import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe("GUEST: Video Creation", () => {
  it("GUEST: Create Vedio", () => {
    const vedioPath = "ved.mp4/"; // Place file inside cypress/fixtures
    const personYouWantToTaggTheVedio = "fatimaupdated";
    const locationToSelect = "Toronto";

    loginAsUser();

    cy.get("nav a")
      .contains("Create")
      .should("be.visible")
      .click({ force: true });

    cy.contains("span", "Select from computer")
      .should("be.visible")
      .click({ force: true });

    cy.get('input[type="file"]')
      .first()
      .selectFile(`cypress/fixtures/${vedioPath}`, { force: true });

    cy.get(
      "div.animate-spin.rounded-full.border-t-4.border-solid.h-10.w-10"
    ).should("not.exist");

    cy.wait(5000);

    cy.get('textarea[placeholder="Add a description..."]')
      .should("be.visible")
      .type("This is my video description for testing.", { delay: 0 });

    cy.contains("button", "Tag people")
      .should("be.visible")
      .click({ force: true });

    cy.get('input[placeholder="Search People..."]')
      .should("exist")
      .type(personYouWantToTaggTheVedio);

    cy.get("section.overflow-y-scroll")
      .should("be.visible")
      .within(() => {
        cy.contains("span[title]", personYouWantToTaggTheVedio)
          .scrollIntoView()
          .click({ force: true });
      });

    cy.contains("button.text-sm", "Save")
      .scrollIntoView()
      .should("exist")
      .click({ force: true });

    cy.contains("button", "Add location")
      .should("exist")
      .click({ force: true });

    cy.get('input[placeholder="Search location..."]')
      .should("exist")
      .type(locationToSelect);

    cy.get("ul.py-2 li.p-2")
      .contains(locationToSelect)
      .scrollIntoView()
      .click({ force: true });

    cy.contains("button.text-sm", "Save")
      .scrollIntoView()
      .should("exist")
      .click({ force: true });

    cy.wait(3000);

    // Button Works fine
    cy.contains("button", "Post")
      .scrollIntoView()
      .should("be.exist")
      .click({ force: true });

    cy.wait(1000);

    cy.wait(12000);
    cy.get(
      "div.animate-spin.rounded-full.border-t-4.border-solid.h-10.w-10"
    ).should("not.exist");
  });
});
