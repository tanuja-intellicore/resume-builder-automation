import { request, APIRequestContext, APIResponse,expect} from '@playwright/test';
import { setApiState } from '../helper/pageFixture';
import stripAnsi from 'strip-ansi';

let apiContext: APIRequestContext;

export async function initApiContext(baseURL: string): Promise<void> {
  apiContext = await request.newContext({ baseURL });
}

export async function getApi(endpoint: string): Promise<APIResponse> {
  const response = await apiContext.get(endpoint);
  setApiState(response, endpoint);
  return response;
}

export async function postApi(endpoint: string, data: any): Promise<APIResponse> {
  const response = await apiContext.post(endpoint, { data });
  setApiState(response, endpoint, data);
  return response;
}

export function expectStatus(response: APIResponse, expectedStatus: number): void {
  try {
    expect(response.status()).toEqual(expectedStatus);
  } catch (error) {
    const cleanMessage = stripAnsi(error.message);
    throw new Error(cleanMessage);
  }
}
