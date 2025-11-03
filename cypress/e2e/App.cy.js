import { loginAsUser, loginAsHost } from "../support/utils/utils";

describe("Smoke Testing Of Tripshepherd Website As a Guest", () => {
  it.skip("Smoke Testing Of Tripshepherd Website As a GUEST", () => {
    cy.viewport(1920, 1080);
    loginAsUser();
  });

  it.skip("Smoke Testing Of Tripshepherd Website As a HOST", () => {
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

  it.skip("HOST: Create Experience Test", () => {
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

  it.skip("HOST: Delete Test Experience Test", () => {
    loginAsHost();
    for (let i = 0; i < 16; i++) {
      cy.get('img[src="/delete-icon.svg"]').first().click({ force: true });
      cy.get("button.bg-primary")
        .filter(':contains("Delete Experience")')
        .click();
      cy.contains("div", "Dashboard").should("be.visible").click();
    }
  });

  it.skip("GUEST: Search and book experience Test", () => {
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

  it.skip("GUEST: Update User's Name", () => {
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

  it.skip("GUEST: Update User's userName", () => {
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
      .eq(1)
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get('input[placeholder="Enter your username"]')
      .should("be.visible")
      .clear()
      .type("Data");
    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it.skip("GUEST: Update User's Bio", () => {
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
      .type(
        "I’m a QA expert passionate about breaking things to make them better!"
      );

    cy.contains("button", "Save").should("be.visible").click();

    cy.contains("Profile updated successfully!").should("be.visible");

    cy.wait(2000);
  });

  it.skip("GUEST: Update User's Tiktok Account", () => {
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

  it.skip("GUEST: Upload User's Instagram", () => {
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

  it.skip("GUEST: Upload User Picture True first Round", () => {
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

  it.skip("GUEST: Remove User's Picture True", () => {
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

  it.skip("GUEST: Upload User Picture Second Round", () => {
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

  it.skip("GUEST: Create Picture", () => {
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

  it("GUEST: Create Guest Account", () => {
    const prefix = "9234";

    // Generate a random 8-digit number
    const randomPart = Math.floor(10000000 + Math.random() * 90000000);

    // Combine prefix + random part
    const randomNumber = `${prefix}${randomPart}`;
    const personFirstName = "Dota";

    const personLastName = "Don";

    const personEmail = `waseem${randomPart}@test.com`;

    cy.viewport(1920, 1080);
    cy.visit("https://pr-121.ddl3rcnmmz93r.amplifyapp.com/");
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
