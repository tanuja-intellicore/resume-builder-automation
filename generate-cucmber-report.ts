const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports/",
  reportName: "Resume Builder Automation Report",
  pageTitle: "Resume Builder Automation Report",
  displayDuration: true,
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
