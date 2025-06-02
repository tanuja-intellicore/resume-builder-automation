import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";

import { helper } from "../../test/step-implemenations/login.ui";


Given('I open the login page', async function () {
  await login.navigateToLoginPage();
  
});

When('I enter {string} credentials', async function (role: string) {
  await pageFixture.page
    .locator('input[type="email"]')
    .fill(envConfig["users"][role].email);
  await pageFixture.page
    .locator('input[type="password"]')
    .fill(envConfig["users"][role].password);
  await pageFixture.page.click("#login");
});

Then('I should see the dashboard', async function () {
  await pageFixture.page.waitForSelector(
    "text=QA Meetup with Rahul Shetty @Pune - Limited Seats! Book Now!"
  );
  const url = pageFixture.page.url();
  assert.ok(url.includes("/dashboard"), "User is not on dashboard page");
});
