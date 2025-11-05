import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe("HOST: Delete Experience", () => {
  it("HOST: Delete Experience Test", () => {
    loginAsHost();
    for (let i = 0; i < 1; i++) {
      cy.get('img[src="/delete-icon.svg"]').first().click({ force: true });
      cy.get("button.bg-primary")
        .filter(':contains("Delete Experience")')
        .click();
      cy.contains("div", "Dashboard").should("be.visible").click();
    }
  });
});
