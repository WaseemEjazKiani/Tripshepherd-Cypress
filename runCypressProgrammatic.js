// runCypressProgrammatic.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const cypress = require("cypress");

(async () => {
  try {
    console.log("🚀 Running Cypress programmatically...");

    const outFile = path.resolve(__dirname, "results.json");

    if (fs.existsSync(outFile)) {
      console.log("🧹 Removing old results.json...");
      fs.unlinkSync(outFile);
    }

    // Run Cypress programmatically with JSON reporter
    const res = await cypress.run({
      reporter: "json",
      reporterOptions: { output: outFile },
      headed: false,
    });

    // Write fallback if reporter didn't create file
    if (!fs.existsSync(outFile)) {
      console.log("⚠️ Reporter didn't write results.json, writing fallback...");
      fs.writeFileSync(outFile, JSON.stringify(res, null, 2));
    } else {
      console.log("✅ results.json created by reporter.");
    }

    // --- Gather Stats ---
    const totalTests =
      res.totalTests ??
      res.total ??
      res.runs?.reduce((s, r) => s + (r.stats.tests || 0), 0);
    const totalPassed =
      res.totalPassed ??
      res.passes ??
      res.runs?.reduce((s, r) => s + (r.stats.passes || 0), 0);
    const totalFailed =
      res.totalFailed ??
      res.failures ??
      res.runs?.reduce((s, r) => s + (r.stats.failures || 0), 0);
    const totalPending =
      res.totalPending ??
      res.pending ??
      res.runs?.reduce((s, r) => s + (r.stats.pending || 0), 0);

    console.log("📊 Cypress Run Summary:");
    console.log(`   Total tests : ${totalTests}`);
    console.log(`   ✅ Passed    : ${totalPassed}`);
    console.log(`   ❌ Failed    : ${totalFailed}`);
    console.log(`   ⏸ Pending   : ${totalPending}`);
    console.log("------------------------------------------");

    // --- Trigger email if failed ---
    if (totalFailed > 0) {
      console.log(
        `🚨 ${totalFailed} test(s) failed — running sendEmailOnFail.js...`
      );
      try {
        execSync("node sendEmailOnFail.js", { stdio: "inherit" });
      } catch (err) {
        console.error("⚠️ Error executing sendEmailOnFail.js:", err.message);
      }
    } else {
      console.log("✅ All tests passed — no email sent.");
    }

    // Always exit cleanly
    process.exit(0);
  } catch (err) {
    console.error("❌ Cypress run failed programmatically:", err);
    process.exit(2);
  }
})();
