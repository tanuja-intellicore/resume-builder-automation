import { APIRequestContext, APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';

export async function getPosts(context: APIRequestContext): Promise<APIResponse> {
  console.log("Request context: " + JSON.stringify(context, null, 2));

  const apiResponse = await context.get('/posts');

  console.log("apiResponse status: " + apiResponse.status());

  return apiResponse;
}

export function expectStatus(response: APIResponse, expectedStatus: number = 200): void {
  expect(response.status()).toEqual(expectedStatus);
}