// test/step-definitions/apiSteps.ts
import { Before, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test'; // or use assert
import { request } from '@playwright/test'
import { expectStatus, getPosts } from '../step-implementations/api.helper';

let context,apiResponse;

Before({ tags: "@get-api" }, async function () {
  context  = await request.newContext({
   baseURL: 'https://jsonplaceholder.typicode.com',
  });
});

Given('get all data from api', async function () {
  apiResponse = await getPosts(context, '/posts');
});

Then('verify the response code is {string}', async function (code: string) {
    const codeNumber = parseInt(code, 10); // Convert string to number
    return expectStatus(apiResponse, codeNumber);
});