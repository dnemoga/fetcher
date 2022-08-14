import { FetcherOptions } from './types/fetcher-options';
import { RequestOptions } from './types/request-options';

import { Interceptor } from './interceptor';

import {
  toPayload,
  toUrl
} from './helpers';

export class Fetcher {
  readonly onRequest = new Interceptor<Request>();
  readonly onResponse = new Interceptor<Response>();

  readonly #mode: Required<FetcherOptions>['mode'];
  readonly #credentials: Required<FetcherOptions>['credentials'];
  readonly #cache: Required<FetcherOptions>['cache'];
  readonly #redirect: Required<FetcherOptions>['redirect'];
  readonly #referrerPolicy: Required<FetcherOptions>['referrerPolicy'];

  constructor(options?: FetcherOptions) {
    this.#mode = options?.mode ?? 'cors';
    this.#credentials = options?.credentials ?? 'same-origin';
    this.#cache = options?.cache ?? 'default';
    this.#redirect = options?.redirect ?? 'follow';
    this.#referrerPolicy = options?.referrerPolicy ?? 'strict-origin-when-cross-origin';
  }

  async get(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.#request('get', baseUrl, options);
  }

  async head(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.#request('head', baseUrl, options);
  }

  async post(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.#request('post', baseUrl, options);
  }

  async put(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.#request('put', baseUrl, options);
  }

  async patch(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.#request('patch', baseUrl, options);
  }

  async delete(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.#request('delete', baseUrl, options);
  }

  async #request(method: string, baseUrl: string, options?: RequestOptions): Promise<Response> {
    const payload = toPayload(options?.data);

    // TODO: Replace with pipe operator when it's ready
    return this.onResponse.intercept(
      await fetch(
        await this.onRequest.intercept(
          new Request(
            toUrl(baseUrl, options?.params ?? {}),

            {
              method: method.toUpperCase(),
              headers: { ...payload.headers, ...options?.headers },
              body: payload.body,

              mode: options?.mode ?? this.#mode,
              credentials: options?.credentials ?? this.#credentials,
              cache: options?.cache ?? this.#cache,
              redirect: options?.redirect ?? this.#redirect,
              referrerPolicy: options?.referrerPolicy ?? this.#referrerPolicy,

              integrity: options?.integrity,
              keepalive: options?.keepalive,
              signal: options?.signal
            }
          )
        )
      )
    );
  }
}
