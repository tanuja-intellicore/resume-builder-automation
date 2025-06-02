import { pageFixture } from "../helper/pageFixture";
import { envConfig } from "../helper/env";
import * as assert from 'assert';


export async function navigateToBaseUrl(): Promise<void> {
  await pageFixture.page.goto(envConfig.BASE_URL);
}

export async function loginAsUser(role: string): Promise<void> {
  const user = envConfig["users"][role];
  if (!user) {
    throw new Error(`No user configuration found for role: ${role}`);
  }

  const page = pageFixture.page;

  await page.locator('input[type="email"]').fill(user.email);
  await page.locator('input[type="password"]').fill(user.password);
  await page.click("#login");
}

export async function verifyDashboardPage(): Promise<void> {
  const page = pageFixture.page;

  await page.waitForSelector(
    'text=QA Meetup with Rahul Shetty @Pune - Limited Seats! Book Now!'
  );
  const url = page.url();
  assert.ok(url.includes('/dashboard'), 'User is not on dashboard page');
}

