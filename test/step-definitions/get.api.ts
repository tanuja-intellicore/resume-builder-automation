// test/step-definitions/apiSteps.ts
import { After, Before, BeforeAll, Given, Status, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test'; // or use assert
import { initApiContext,expectStatus, getApi, postApi } from '../step-implementations/api.helper';

let apiResponse;

Before({ tags: "@get-api" }, async function () {
    await initApiContext('https://jsonplaceholder.typicode.com');
});

Given('get all data from api', async function () {
  apiResponse = await getApi('/posts');
  const response = await apiResponse.json();
  const hasUserId1 = response.some((item: any) => item.userId === 1);
  expect(hasUserId1).toBe(true);
});

Then('verify the response code is {string}', async function (code: string) {
    const codeNumber = parseInt(code, 10); // Convert string to number
    expectStatus(apiResponse, codeNumber);
});