const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "{guest,host,smoke}/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
