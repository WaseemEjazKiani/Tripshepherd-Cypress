import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe.skip("GUEST: Update Profile Information", () => {
  it("GUEST: Update User's Name", () => {
    const searchText = "buhuhuh uh";

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "div.text-secondary.cursor-pointer.justify-between.flex.items-center"
    )
      .eq(0)
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get('input[placeholder="Enter your first name"]')
      .should("be.visible")
      .clear()
      .type("Data");
    cy.get('input[placeholder="Enter your last name"]')
      .should("be.visible")
      .clear()
      .type("Don");
    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it("GUEST: Update User's userName", () => {
    const searchText = "buhuhuh uh";
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "div.text-secondary.cursor-pointer.justify-between.flex.items-center"
    )
      .eq(1)
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get('input[placeholder="Enter your username"]')
      .should("be.visible")
      .clear()
      .type(`Data${randomNum}`);
    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it("GUEST: Update User's Bio", () => {
    const searchText = "buhuhuh uh";

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get("div.cursor-pointer.flex.items-center.justify-between")
      .eq(2) // 3rd element
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get(
      'textarea[placeholder="Write a captivating bio to showcase your passion, expertise."]'
    )
      .should("be.visible")
      .clear()
      .type(
        "I’m a QA expert passionate about breaking things to make them better!"
      );

    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it("GUEST: Update User's Tiktok Account", () => {
    const searchText = "buhuhuh uh";

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "div.text-sm.sm_md\\:text-base.text-secondary.justify-between.flex.items-center"
    )
      .find("p.cursor-pointer")
      .eq(0)
      .click({ force: true });

    cy.get('input[placeholder="Add your TikTok Profile Link"]')
      .should("be.visible")
      .clear()
      .type("https://www.tiktok.com/@qa_tester", { delay: 0 });

    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it("GUEST: Upload User's Instagram", () => {
    const searchText = "buhuhuh uh";

    loginAsUser();

    cy.get("nav a")
      .contains("Profile")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    cy.get('img[alt="/black-edit-icon.svg"]').should("be.visible").click();

    cy.get(
      "div.text-sm.sm_md\\:text-base.text-secondary.justify-between.flex.items-center"
    )
      .find("p.cursor-pointer")
      .eq(1)
      .click({ force: true });

    cy.get('input[placeholder="Add your Instagram Profile Link"]')
      .should("be.visible")
      .clear()
      .type("https://www.instagram.com/qa_tester", { delay: 0 });

    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });
});
