import type { CommonOptions } from './types/common-options';
import type { RequestOptions } from './types/request-options';

import {
  isArrayBuffer,
  isArrayBufferView,
  isBlob,
  isString,
  isURLSearchParams,
  isFormData,
  isNull,
  isUndefined
} from './utils.js';

export class Fetcher {
  readonly interceptors: Set<(request: Request) => Request> = new Set();

  readonly #mode: Required<CommonOptions>['mode'];
  readonly #cache: Required<CommonOptions>['cache'];
  readonly #referrerPolicy: Required<CommonOptions>['referrerPolicy'];
  readonly #credentials: Required<CommonOptions>['credentials'];

  constructor(options?: CommonOptions) {
    this.#mode = options?.mode ?? 'cors';
    this.#cache = options?.cache ?? 'default';
    this.#referrerPolicy = options?.referrerPolicy ?? 'strict-origin-when-cross-origin';
    this.#credentials = options?.credentials ?? 'same-origin';
  }

  async get(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'GET',
        body: null,
        headers: options?.headers,
        mode: options?.mode,
        cache: options?.cache,
        referrerPolicy: options?.referrerPolicy,
        credentials: options?.credentials,
        signal: options?.signal
      }
    );
  }

  async head(baseUrl: string, options?: Omit<RequestOptions, 'data'>): Promise<Response> {
    return this.#makeRequest(
      this.#composeUrl(baseUrl, options?.params),

      {
        method: 'HEAD',
        body: null,
        headers: options?.headers,
        mode: options?.mode,
        cache: options?.cache,
        referrerPolicy: options?.referrerPolicy,
        credentials: options?.credentials,
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
        body: payload.body,
        headers: { ...payload.headers, ...options?.headers },
        mode: options?.mode,
        cache: options?.cache,
        referrerPolicy: options?.referrerPolicy,
        credentials: options?.credentials,
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
        body: payload.body,
        headers: { ...payload.headers, ...options?.headers },
        mode: options?.mode,
        cache: options?.cache,
        referrerPolicy: options?.referrerPolicy,
        credentials: options?.credentials,
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
        body: payload.body,
        headers: { ...payload.headers, ...options?.headers },
        mode: options?.mode,
        cache: options?.cache,
        referrerPolicy: options?.referrerPolicy,
        credentials: options?.credentials,
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
        body: payload.body,
        headers: { ...payload.headers, ...options?.headers },
        mode: options?.mode,
        cache: options?.cache,
        referrerPolicy: options?.referrerPolicy,
        credentials: options?.credentials,
        signal: options?.signal
      }
    );
  }

  async #makeRequest(url: string, init: RequestInit): Promise<Response> {
    const request = [...this.interceptors].reduce(
      (request, interceptor) => interceptor(request),

      new Request(url, {
        method: init.method,
        body: init.body,
        headers: init.headers,
        mode: init.mode ?? this.#mode,
        cache: init.cache ?? this.#cache,
        referrerPolicy: init.referrerPolicy ?? this.#referrerPolicy,
        credentials: init.credentials ?? this.#credentials,
        signal: init.signal
      })
    );

    return fetch(request);
  }

  #composeUrl(baseUrl: string, params?: Record<string, string>): string {
    return params ? baseUrl + '?' + new URLSearchParams(params) : baseUrl;
  }

  #preparePayload(data: unknown): Pick<RequestInit, 'body' | 'headers'> {
    if (isArrayBuffer(data)) return { body: data };
    if (isArrayBufferView(data)) return { body: data };
    if (isBlob(data)) return { body: data };
    if (isString(data)) return { body: data };
    if (isURLSearchParams(data)) return { body: data };
    if (isFormData(data)) return { body: data };
    if (isNull(data)) return { body: data };
    if (isUndefined(data)) return { body: data };

    return {
      body: JSON.stringify(data),

      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
  }
}
