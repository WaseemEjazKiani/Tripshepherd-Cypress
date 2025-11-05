import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe("GUEST: Manage Profile Picture", () => {
  it("GUEST: Upload User Picture first Round", () => {
    const imagePath = "company.jpg/"; // Place file inside cypress/fixtures

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "span.text-sm.justify-center.text-primary.cursor-pointer.font-normal"
    ).then(($el) => {
      if ($el.text().includes("Edit profile picture")) {
        cy.contains("Edit profile picture").click({ force: true });
      } else {
        cy.contains("Add photo").click({ force: true });
      }
    });

    cy.wait(2000);

    cy.get('[data-cy="upload-picture"]').trigger("click");

    // Image Upload

    cy.get('input[type="file"]')
      .first()
      .selectFile(`cypress/fixtures/${imagePath}`, { force: true });

    cy.contains("button", "Save").should("be.visible").click({ force: true });

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it("GUEST: Remove User's Picture", () => {
    const imagePath = "company.jpg/"; // Place file inside cypress/fixtures

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });

    cy.wait(1000);

    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "span.text-sm.justify-center.text-primary.cursor-pointer.font-normal"
    ).then(($el) => {
      if ($el.text().includes("Edit profile picture")) {
        cy.contains("Edit profile picture").click({ force: true });
      } else {
        cy.contains("Add photo").click({ force: true });
      }
    });

    cy.wait(1000);

    cy.get('[data-cy="remove-picture"]').trigger("click");

    cy.contains("button", "Save").should("be.visible").click({ force: true });

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it("GUEST: Upload User Picture Second Round", () => {
    const imagePath = "company.jpg/"; // Place file inside cypress/fixtures

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "span.text-sm.justify-center.text-primary.cursor-pointer.font-normal"
    ).then(($el) => {
      if ($el.text().includes("Edit profile picture")) {
        cy.contains("Edit profile picture").click({ force: true });
      } else {
        cy.contains("Add photo").click({ force: true });
      }
    });

    cy.wait(2000);

    cy.get('[data-cy="upload-picture"]').trigger("click");

    // Image Upload

    cy.get('input[type="file"]')
      .first()
      .selectFile(`cypress/fixtures/${imagePath}`, { force: true });

    cy.contains("button", "Save").should("be.visible").click({ force: true });

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });
});
