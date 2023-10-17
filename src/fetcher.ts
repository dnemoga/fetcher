import { FetcherOptions } from './types/fetcher-options.js';
import { RequestOptions } from './types/request-options.js';

import { Interceptor } from './interceptor.js';

import {
  toPayload,
  toUrl
} from './helpers.js';

export class Fetcher {
  readonly onRequest = new Interceptor<Request>();
  readonly onResponse = new Interceptor<Response>();

  readonly #mode: Required<FetcherOptions>['mode'];
  readonly #credentials: Required<FetcherOptions>['credentials'];
  readonly #cache: Required<FetcherOptions>['cache'];
  readonly #redirect: Required<FetcherOptions>['redirect'];
  readonly #referrerPolicy: Required<FetcherOptions>['referrerPolicy'];

  /**
   * @see {@link FetcherOptions.mode | `FetcherOptions.mode`}
   */
  get mode(): Required<FetcherOptions>['mode'] {
    return this.#mode;
  }

  /**
   * @see {@link FetcherOptions.credentials | `FetcherOptions.credentials`}
   */
  get credentials(): Required<FetcherOptions>['credentials'] {
    return this.#credentials;
  }

  /**
   * @see {@link FetcherOptions.cache | `FetcherOptions.cache`}
   */
  get cache(): Required<FetcherOptions>['cache'] {
    return this.#cache;
  }

  /**
   * @see {@link FetcherOptions.redirect | `FetcherOptions.redirect`}
   */
  get redirect(): Required<FetcherOptions>['redirect'] {
    return this.#redirect;
  }

  /**
   * @see {@link FetcherOptions.referrerPolicy | `FetcherOptions.referrerPolicy`}
   */
  get referrerPolicy(): Required<FetcherOptions>['referrerPolicy'] {
    return this.#referrerPolicy;
  }

  constructor(options?: FetcherOptions) {
    this.#mode = options?.mode ?? 'cors';
    this.#credentials = options?.credentials ?? 'same-origin';
    this.#cache = options?.cache ?? 'default';
    this.#redirect = options?.redirect ?? 'follow';
    this.#referrerPolicy = options?.referrerPolicy ?? 'strict-origin-when-cross-origin';
  }

  async request(method: 'get', baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response>;
  async request(method: 'head', baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response>;
  async request(method: 'post', baseUrl: string, options?: RequestOptions): Promise<Response>;
  async request(method: 'put', baseUrl: string, options?: RequestOptions): Promise<Response>;
  async request(method: 'patch', baseUrl: string, options?: RequestOptions): Promise<Response>;
  async request(method: 'delete', baseUrl: string, options?: RequestOptions): Promise<Response>;

  async request(method: string, baseUrl: string, options?: RequestOptions): Promise<Response> {
    const payload = toPayload(options?.data);

    // TODO: Replace this chain with the pipe operator when it's ready
    return this.onResponse.intercept(
      await fetch(
        await this.onRequest.intercept(
          new Request(
            toUrl(baseUrl, options?.params),

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

  /**
   * @alias {@link Fetcher.request | `Fetcher.request('get', baseUrl, options)`}
   */
  async get(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.request('get', baseUrl, options);
  }

  /**
   * @alias {@link Fetcher.request | `Fetcher.request('head', baseUrl, options)`}
   */
  async head(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.request('head', baseUrl, options);
  }

  /**
   * @alias {@link Fetcher.request | `Fetcher.request('post', baseUrl, options)`}
   */
  async post(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.request('post', baseUrl, options);
  }

  /**
   * @alias {@link Fetcher.request | `Fetcher.request('put', baseUrl, options)`}
   */
  async put(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.request('put', baseUrl, options);
  }

  /**
   * @alias {@link Fetcher.request | `Fetcher.request('patch', baseUrl, options)`}
   */
  async patch(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.request('patch', baseUrl, options);
  }

  /**
   * @alias {@link Fetcher.request | `Fetcher.request('delete', baseUrl, options)`}
   */
  async delete(baseUrl: string, options?: RequestOptions): Promise<Response> {
    return this.request('delete', baseUrl, options);
  }
}
