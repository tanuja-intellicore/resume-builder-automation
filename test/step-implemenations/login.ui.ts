import { pageFixture } from "../helper/pageFixture";
import { envConfig } from "../helper/env";



await pageFixture.page.goto(envConfig.BASE_URL);