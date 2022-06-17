import type { CommonOptions } from './types/common-options';
import type { RequestOptions } from './types/request-options';

import {
  isReadableStream,
  isBlob,
  isBufferSource,
  isFormData,
  isURLSearchParams,
  isString,
  isNull,
  isUndefined
} from './utils.js';

export class Fetcher {
  readonly interceptors: Set<(request: Request) => Request> = new Set();

  readonly #mode: Required<CommonOptions>['mode'];
  readonly #credentials: Required<CommonOptions>['credentials'];
  readonly #cache: Required<CommonOptions>['cache'];
  readonly #redirect: Required<CommonOptions>['redirect'];
  readonly #referrerPolicy: Required<CommonOptions>['referrerPolicy'];

  constructor(options?: CommonOptions) {
    this.#mode = options?.mode ?? 'cors';
    this.#credentials = options?.credentials ?? 'same-origin';
    this.#cache = options?.cache ?? 'default';
    this.#redirect = options?.redirect ?? 'follow';
    this.#referrerPolicy = options?.referrerPolicy ?? 'strict-origin-when-cross-origin';
  }

  async get(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'GET',
        headers: options?.headers,
        body: null,
        mode: options?.mode,
        credentials: options?.credentials,
        cache: options?.cache,
        redirect: options?.redirect,
        referrerPolicy: options?.referrerPolicy,
        integrity: options?.integrity,
        signal: options?.signal
      }
    );
  }

  async head(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'HEAD',
        headers: options?.headers,
        body: null,
        mode: options?.mode,
        credentials: options?.credentials,
        cache: options?.cache,
        redirect: options?.redirect,
        referrerPolicy: options?.referrerPolicy,
        integrity: options?.integrity,
        signal: options?.signal
      }
    );
  }

  async post(baseUrl: string, options?: RequestOptions): Promise<Response> {
    const payload = this.#preparePayload(options?.data);

    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'POST',
        headers: { ...payload.headers, ...options?.headers },
        body: payload.body,
        mode: options?.mode,
        credentials: options?.credentials,
        cache: options?.cache,
        redirect: options?.redirect,
        referrerPolicy: options?.referrerPolicy,
        integrity: options?.integrity,
        signal: options?.signal
      }
    );
  }

  async put(baseUrl: string, options?: RequestOptions): Promise<Response> {
    const payload = this.#preparePayload(options?.data);

    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'PUT',
        headers: { ...payload.headers, ...options?.headers },
        body: payload.body,
        mode: options?.mode,
        credentials: options?.credentials,
        cache: options?.cache,
        redirect: options?.redirect,
        referrerPolicy: options?.referrerPolicy,
        integrity: options?.integrity,
        signal: options?.signal
      }
    );
  }

  async patch(baseUrl: string, options?: RequestOptions): Promise<Response> {
    const payload = this.#preparePayload(options?.data);

    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'PATCH',
        headers: { ...payload.headers, ...options?.headers },
        body: payload.body,
        mode: options?.mode,
        credentials: options?.credentials,
        cache: options?.cache,
        redirect: options?.redirect,
        referrerPolicy: options?.referrerPolicy,
        integrity: options?.integrity,
        signal: options?.signal
      }
    );
  }

  async delete(baseUrl: string, options?: RequestOptions): Promise<Response> {
    const payload = this.#preparePayload(options?.data);

    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'DELETE',
        headers: { ...payload.headers, ...options?.headers },
        body: payload.body,
        mode: options?.mode,
        credentials: options?.credentials,
        cache: options?.cache,
        redirect: options?.redirect,
        referrerPolicy: options?.referrerPolicy,
        integrity: options?.integrity,
        signal: options?.signal
      }
    );
  }

  async #makeRequest(url: string, init: RequestInit): Promise<Response> {
    const request = [...this.interceptors].reduce(
      (request, interceptor) => interceptor(request),

      new Request(url, {
        method: init.method,
        headers: init.headers,
        body: init.body,
        mode: init.mode ?? this.#mode,
        credentials: init.credentials ?? this.#credentials,
        cache: init.cache ?? this.#cache,
        redirect: init.redirect ?? this.#redirect,
        referrerPolicy: init.referrerPolicy ?? this.#referrerPolicy,
        integrity: init.integrity,
        signal: init.signal
      })
    );

    return fetch(request);
  }

  #composeUrl(baseUrl: string, params?: Record<string, string>): string {
    return params ? baseUrl + '?' + new URLSearchParams(params) : baseUrl;
  }

  #preparePayload(data: unknown): Pick<RequestInit, 'headers' | 'body'> {
    if (isReadableStream(data)) return { body: data };
    if (isBlob(data)) return { body: data };
    if (isBufferSource(data)) return { body: data };
    if (isFormData(data)) return { body: data };
    if (isURLSearchParams(data)) return { body: data };
    if (isString(data)) return { body: data };
    if (isNull(data)) return { body: data };
    if (isUndefined(data)) return { body: data };

    return {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },

      body: JSON.stringify(data)
    };
  }
}
