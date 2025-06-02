import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

Before({ tags: "@ui" }, async function () {
  const value = process.env.HEAD; // e.g., "true" or "false"
  console.log("Headless mode:", value);
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
     await context.tracing.stop({ path: `test-results/traces/trace-${Date.now()}.zip` });
  }
  else{
     await context.tracing.stop();
  }
  await pageFixture.page.close();
  await context.close();
  await browser.close();
});
