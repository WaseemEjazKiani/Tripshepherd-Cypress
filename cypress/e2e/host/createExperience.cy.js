import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe.skip("HOST: Create Experience", () => {
  it("HOST: Create Experience Test", () => {
    loginAsHost();

    //Click the Create Experience Option From Menu
    cy.contains("span", "Create Experience")
      .should("be.visible")
      .click({ force: true });
    cy.wait(2000);

    cy.clickIfVisible('span.text-black.text-base:contains("Let’s go!")', {
      force: true,
    });

    // Enter Experience Title
    cy.get('textarea[placeholder="Nature\'s Secret Trails and Scenic Views"]')
      .should("exist")
      .should("be.visible")
      .scrollIntoView()
      .clear({ force: true }) // clears any pre-filled content
      .type("Exploring hidden waterfalls and mountain paths", {
        delay: 30,
        force: true,
      }); // slow typing to mimic real user

    // Press the next Button
    cy.get("span.text-black.text-lg")
      .contains("Next")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Next" button not visible — continuing');
        }
      });

    // Enter Experience Description
    cy.get(
      'textarea[placeholder="Tell guest a story of what they’ll do during your experience."]'
    )
      .should("exist")
      .should("be.visible")
      .scrollIntoView()
      .clear({ force: true })
      .type(
        "Guests will embark on a breathtaking journey through scenic landscapes and local culture.",
        { delay: 30, force: true }
      );

    // Now Select the City //Then// Type in dropdown then wait 2 sec and then click the first option of the dropdown
    const city = "Toronto, C";
    cy.get('input[placeholder="Type or select city"]')
      .should("exist")
      .should("be.visible")
      .scrollIntoView()
      .clear({ force: true })
      .type(`${city}`, { delay: 50, force: true });

    cy.wait(2000);
    cy.get(".absolute.z-10").should("be.visible");
    cy.get(".absolute.z-10 ul li").first().should("be.visible").click();

    //Now clicking the Duration Dropdown.. Then entering input in dropdown.. then selecting the first item from dropdown (Used a Command Method)
    cy.get("div")
      .contains(/^Duration$/)
      .should("be.visible")
      .click();
    const userInput = "1 hour"; // change this value dynamically
    cy.selectDuration(userInput);

    //Now Searching in Meeting Place Dropdown.. Then Clicking the first Item of result.
    cy.get('input[placeholder="Search for a meeting place"]')
      .clear()
      .type("Bali");
    cy.get(".absolute.z-10 ul li").first().should("be.visible").click();

    //Now Entering Groupsize Then Hitting Enter..
    cy.get('input[placeholder="Maximum group size"]')
      .should("be.visible")
      .clear()
      .type("10");

    // Press the next Button
    cy.get("span.text-black.text-lg")
      .contains("Next")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Next" button not visible — continuing');
        }
      });

    // ================================Accessibility Page==========================

    // Select all checkboxes within this Accessibility
    cy.get('.space-y-4 input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should("be.visible").check({ force: true });
    });

    cy.get('input[placeholder="Describe other accessibility details"]')
      .should("be.visible")
      .clear()
      .type("This place has basic accessibility with ramps and support rails");

    cy.get(
      'textarea[placeholder="What else should your guests know to be prepared for the experience?"]'
    )
      .should("be.visible")
      .clear()
      .type(
        "Please bring comfortable shoes, water, and follow the safety instructions during the activity."
      );

    // Press the next Button
    cy.get("span.text-black.text-lg")
      .contains("Next")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Next" button not visible — continuing');
        }
      });

    // =================================== Pricing Page ================================================

    cy.get('input[placeholder="Enter amount"]')
      .eq(0)
      .should("be.visible")
      .clear()
      .type("5000");

    // Select the Children checkbox THEN enter value
    cy.get('input[type="checkbox"]').eq(0).check({ force: true });
    cy.get('input[placeholder="Enter amount"]')
      .eq(1)
      .should("be.visible")
      .clear()
      .type("3000");

    // 2️⃣ Second checkbox – show input and type amount
    cy.get('input[type="checkbox"]')
      .eq(1) // Select the second checkbox
      .check({ force: true });

    cy.get('input[placeholder="Enter amount"]')
      .eq(2)
      .should("be.visible")
      .last()
      .clear()
      .type("5000");

    // 3️⃣ Third checkbox – no input field required
    cy.get('input[type="checkbox"]').eq(2).check({ force: true });

    // Press the next Button
    cy.get("span.text-black.text-lg")
      .contains("Next")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Next" button not visible — continuing');
        }
      });

    cy.contains("span", "Add videos")
      .should("be.visible")
      .click({ force: true });

    const videoPath = "ved.mp4"; // Place file inside cypress/fixtures

    cy.get('input[type="file"]')
      .first()
      .selectFile(`cypress/fixtures/${videoPath}`, { force: true });

    // Optional: click upload/confirm button
    cy.contains("button", "Upload").click({ force: true });

    // cy.get('.grid .relative.rounded-xl', { timeout: 30000 }).should('exist');
    cy.get(".grid .relative.rounded-xl", { timeout: 300000 }).should("exist");

    cy.wait(2000);

    cy.get("span.text-black.text-lg")
      .contains("Set as Thumbnail")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Set as Thumbnail" button not visible — continuing');
        }
      });
    cy.wait(12000);

    // Press the next Button
    cy.get("span.text-black.text-lg")
      .contains("Next")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Next" button not visible — continuing');
        }
      });

    // Click the first checkbox
    cy.get('input[name="guidelines"]').should("exist").check({ force: true });

    // Click the second checkbox
    cy.get('input[name="termsAndprivacy"]')
      .should("exist")
      .check({ force: true });

    // Press the next Button
    cy.get("span.text-black.text-lg")
      .contains("Submit")
      .then(($el) => {
        if ($el.length > 0 && $el.is(":visible")) {
          cy.wrap($el).scrollIntoView().click({ force: true });
        } else {
          cy.log('ℹ️ "Submit" button not visible — continuing');
        }
      });
  });
});
