import { APIRequestContext, APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';

export async function getPosts(context: APIRequestContext, url:string): Promise<APIResponse> {
  console.log("Request context: " + JSON.stringify(context, null, 2));

  const apiResponse = await context.get(url);

  console.log("apiResponse status: " + apiResponse.status());

  return apiResponse;
}

export function expectStatus(response: APIResponse, expectedStatus: number): void {
  expect(response.status()).toEqual(expectedStatus);
}

