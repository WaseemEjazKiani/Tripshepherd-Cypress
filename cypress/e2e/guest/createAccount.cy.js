import { loginAsUser, loginAsHost } from "../../support/utils/utils";

describe("GUEST: Account Creation", () => {
  it("Create Guest Account", () => {
    const prefix = "9234";

    // Generate a random 8-digit number
    const randomPart = Math.floor(10000000 + Math.random() * 90000000);

    // Combine prefix + random part
    const randomNumber = `${prefix}${randomPart}`;
    const personFirstName = "Dota";

    const personLastName = "Don";

    const personEmail = `waseem${randomPart}@test.com`;

    cy.viewport(1920, 1080);
    // cy.visit("https://pr-121.ddl3rcnmmz93r.amplifyapp.com/");
    cy.visit("https://pr-131.ddl3rcnmmz93r.amplifyapp.com/");
    cy.title().should("include", "Discover Top Local-Led Tours");

    cy.get("button.cursor-pointer span.text-base")
      .should("be.visible")
      .then(($span) => {
        const label = $span.text().trim();

        if (label === "Sign In") {
          cy.contains("Sign In").should("be.visible").click();

          cy.get("input[placeholder='1 (702) 123-4567']")
            .should("exist")
            .type("{backspace}")
            .type(randomNumber);

          cy.contains("button", "Continue").click();

          cy.get('input[id^="otp-input-"]').each(($el, index) => {
            cy.wrap($el).type(`${index + 1}`);
          });

          cy.contains("button", "Continue").click();

          cy.get(".text-secondary > div:first-child img").click();

          cy.get('input[placeholder="First Name"][name="firstName"]')
            .should("be.visible")
            .clear()
            .type(personFirstName);

          cy.get('input[name="lastName"][placeholder="Last Name"]')
            .should("be.visible")
            .clear()
            .type(personLastName);

          cy.get('input[name="contact"][placeholder="Email Address"]')
            .should("be.visible")
            .clear()
            .type(personEmail);

          cy.contains("div", "Agree and Continue")
            .should("be.visible")
            .click({ force: true });

          cy.contains("div", "Select your birthday")
            .should("be.visible")
            .click({ force: true });

          const targetDay = "15"; // your target date (string or number)
          const targetYear = 2010; // your target year
          const targetMonth = "November"; // your target month (full name, case-sensitive)

          const calendarLabel =
            "span.react-calendar__navigation__label__labelText";
          const prevYearBtn = "button.react-calendar__navigation__prev2-button";
          const nextYearBtn = "button.react-calendar__navigation__next2-button";
          const prevMonthBtn = "button.react-calendar__navigation__prev-button";
          const nextMonthBtn = "button.react-calendar__navigation__next-button";

          // month names in order for comparison
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          // ---- YEAR SELECTION ----
          for (let i = 0; i < 30; i++) {
            cy.get(calendarLabel)
              .invoke("text")
              .then((text) => {
                const currentYear = parseInt(text.match(/\d{4}/)[0]);
                if (currentYear === targetYear) {
                  cy.log(`✅ Year matched: ${currentYear}`);
                  return false; // stop loop
                }

                if (currentYear > targetYear) {
                  cy.get(prevYearBtn).click({ force: true });
                } else {
                  cy.get(nextYearBtn).click({ force: true });
                }
              });
          }

          // ---- MONTH SELECTION ----
          for (let i = 0; i < 24; i++) {
            cy.get(calendarLabel)
              .invoke("text")
              .then((text) => {
                const currentMonth = months.find((m) => text.includes(m));

                if (currentMonth === targetMonth) {
                  cy.log(`✅ Month matched: ${currentMonth}`);
                  return false; // stop loop
                }

                const currentIndex = months.indexOf(currentMonth);
                const targetIndex = months.indexOf(targetMonth);

                if (currentIndex > targetIndex) {
                  cy.get(prevMonthBtn).click({ force: true });
                } else {
                  cy.get(nextMonthBtn).click({ force: true });
                }
              });
          }
          const test = "November 15, 2010";
          // const test = "15 November 2010";
          cy.get(`abbr[aria-label="${test}"]`).click({ force: true });

          cy.contains("div", "Agree and Continue")
            .should("be.visible")
            .click({ force: true });
        }
      });
  });
});
