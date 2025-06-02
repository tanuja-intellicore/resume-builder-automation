// test/step-definitions/apiSteps.ts
import { Before, Given, Then } from '@cucumber/cucumber';
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
  apiResponse = await getPosts(context);
});

Then('verify the response code is 200', async function () {
  expectStatus(apiResponse);
});