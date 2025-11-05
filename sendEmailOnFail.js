// sendEmailOnFail.js
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

require("dotenv").config();

const resultsPath = path.resolve(__dirname, "results.json");

if (!fs.existsSync(resultsPath)) {
  console.error("❌ results.json not found. Run Cypress first.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

// --- Aggregate accurate totals from runs[].reporterStats ---
let totalTests = 0;
let totalPassed = 0;
let totalFailed = 0;
let totalPending = 0;
const failedTests = [];

if (Array.isArray(data.runs)) {
  for (const run of data.runs) {
    const s = run.reporterStats || {};
    totalTests += s.tests || 0;
    totalPassed += s.passes || 0;
    totalFailed += s.failures || 0;
    totalPending += s.pending || 0;

    if (Array.isArray(run.tests)) {
      for (const t of run.tests) {
        const failed =
          t.state === "failed" ||
          (t.attempts && t.attempts.some((a) => a.state === "failed"));
        if (failed)
          failedTests.push(`${run.spec.name} → ${t.title.join(" > ")}`);
      }
    }
  }
}

console.log(
  `📊 Cypress Summary: ${totalPassed} passed, ${totalFailed} failed, ${totalPending} pending out of ${totalTests}`
);

if (totalFailed === 0) {
  console.log("✅ All tests passed. No email will be sent.");
  process.exit(0);
}

// --- Build the email body ---
let emailBody = `
<h3>🚨 Cypress Test Failures Detected</h3>
<p>Total Tests: ${totalTests}</p>
<p>✅ Passed: ${totalPassed}</p>
<p>❌ Failed: ${totalFailed}</p>
<p>⏸ Pending: ${totalPending}</p>
<hr/>
`;

if (failedTests.length) {
  emailBody += "<h4>Failed Tests:</h4><ul>";
  failedTests.forEach((f) => (emailBody += `<li>${f}</li>`));
  emailBody += "</ul>";
}

// --- Send email via Nodemailer ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: '"Tripshepherd QA Bot" <youremail@gmail.com>',
  to: "recipient@example.com",
  subject: "❌ Cypress Test Failures Detected",
  html: emailBody,
  attachments: [{ filename: "results.json", path: resultsPath }],
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.error("❌ Error sending email:", err);
  else console.log(`📧 Email sent successfully: ${info.response}`);
});
