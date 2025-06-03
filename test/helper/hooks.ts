import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { getApiState, pageFixture,resetApiState } from "./pageFixture";
import stripAnsi from 'strip-ansi';

let browser: Browser;
let context: BrowserContext;

Before({ tags: "@ui" }, async function () {
  const value = process.env.HEAD; // e.g., "true" or "false"
  const head: boolean = value === "true";
  browser = await chromium.launch({
    headless: head,
    args: ["--start-maximized"]
  });
  context = await browser.newContext({
    viewport: null // Important: this disables the default viewport size
  });
  const page = await context.newPage();
  await context.tracing.start({ screenshots: true, snapshots: true });
  pageFixture.page = page;
});

After({ tags: "@ui" }, async function ({ pickle, result }) {
  let img: Buffer;
  if (result?.status == Status.FAILED) {
    img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    
     await this.attach(img, "image/png");
     await context.tracing.stop({ path: `test-results/traces/trace-${pickle.name}.zip` });
  }
  else{
     await context.tracing.stop();
  }
  await pageFixture.page.close();
  await context.close();
  await browser.close();
});

After({ tags: "@api" }, async function ({ pickle, result }) {
    const { response, endpoint, requestBody } = getApiState();
  if (result?.status == Status.FAILED) {
     if (endpoint) await this.attach(`❌ API Endpoint: ${endpoint}`, 'text/plain');
     if (requestBody) await this.attach(`📤 Request Payload: ${requestBody}`, 'application/json');
      
    if (response) {
      const status = response.status();
      const body = await response.text();

      await this.attach(`📬 Status Code: ${status}`, 'text/plain');
      await this.attach(`📦 Response Body:\n${body}`, 'text/plain');
    }
    const error = (result as any)?.exception;
    if (error?.message) {
      const cleanMessage = stripAnsi(error.message);
      await this.attach(`❗ Error: ${cleanMessage}`, 'text/plain');
    }
  }
     resetApiState();
});

