import fs from 'fs';
import path from 'path';


const report = require("multiple-cucumber-html-reporter");

const resultsDir = path.join(__dirname, '../cucumber-report');

// ✅ Clean the directory before generating
if (fs.existsSync(resultsDir)) {
  fs.rmSync(resultsDir, { recursive: true, force: true });
}

// 💡 Make sure test-results exists now — Cucumber will recreate it
fs.mkdirSync(resultsDir, { recursive: true });

report.generate({
  jsonDir: "cucumber-report",
  reportPath: "cucumber-report",
  reportName: "Resume Builder Automation Report",
  pageTitle: "Resume Builder Automation Report",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "Local",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Test Staus",
    data: [
      { label: "Project", value: "Resume Builder" },
      { label: "Release", value: "1" },
      { label: "Cycle", value: "Smoke" },
    ],
  },
});
