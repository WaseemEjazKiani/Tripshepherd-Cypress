const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pr-115.ddl3rcnmmz93r.amplifyapp.com",

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family === "chromium") {
          // ✅ Automatically allow location
          launchOptions.args.push("--use-fake-ui-for-media-stream");
          launchOptions.args.push("--use-fake-device-for-media-stream");
          launchOptions.args.push("--use-fake-device-for-location");
          launchOptions.args.push("--use-fake-ui-for-location");

          // ✅ Set default fake coordinates (you can change these)
          launchOptions.args.push("--default-geolocation-latitude=31.5204"); // Lahore
          launchOptions.args.push("--default-geolocation-longitude=74.3587"); // Lahore
          launchOptions.args.push("--enable-geolocation");
        }
        return launchOptions;
      });
    },
  },
});

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 50000, // 10 seconds
    pageLoadTimeout: 50000, // optional: wait for page load as well
  },
});
