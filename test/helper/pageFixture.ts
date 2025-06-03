import { Page } from "@playwright/test";
import { APIResponse } from '@playwright/test';

export const pageFixture = {
    // @ts-ignore
    page: undefined as Page,
}

let apiResponse: APIResponse | undefined;
let endpoint: string | undefined;
let requestBody: any = undefined;

export function setApiState(response: APIResponse, url: string, body?: any) {
  apiResponse = response;
  endpoint = url;
  requestBody = body;
}

export function getApiState() {
  return {
    response: apiResponse,
    endpoint,
    requestBody
  };
}

export function getEndpoint(): string | undefined {
  return endpoint;
}

export function resetApiState() {
  apiResponse = undefined;
  endpoint = undefined;
  requestBody = undefined;
}