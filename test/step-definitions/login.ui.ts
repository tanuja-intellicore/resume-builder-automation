import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";

import { navigateToBaseUrl,loginAsUser,verifyDashboardPage,verifyDashboardPage1 } from "../step-implementations/login.ui.helper";
import { pageFixture } from "../helper/pageFixture" // Adjust the path as needed


Given('I open the login page', async function () {
  await navigateToBaseUrl();
});

When('I enter {string} credentials', async function (role: string) {
 await loginAsUser(role);
});

Then('I should see the dashboard', async function () {
 await verifyDashboardPage()
});

Then('I should not see the dashboard', async function () {
 await verifyDashboardPage1();
});
