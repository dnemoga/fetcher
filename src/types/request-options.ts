import { FetcherOptions } from './fetcher-options';

export interface RequestOptions extends FetcherOptions {
  /**
   * Any {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body body} that you want to add to your request. Note that a request using the `GET` or `HEAD` method cannot have a body.
   */
  data?: unknown;

  /**
   * Any search parameters you want to add to your request, contained within an object literal with string values.
   */
  params?: Record<string, string>;

  /**
   * Any headers you want to add to your request, contained within an object literal with string values. Note that {@link https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name some names are forbidden}.
   */
  headers?: Record<string, string>;

  /**
   * Contains the {@link https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity subresource integrity} value of the request.
   */
  integrity?: Request['integrity'];

  /**
   * The `keepalive` option can be used to allow the request to outlive the page. Fetch with the `keepalive` flag is a replacement for the {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon Navigator.sendBeacon()} API.
   */
  keepalive?: Request['keepalive'];

  /**
   * An {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal AbortSignal} object instance; allows you to communicate with a fetch request and abort it if desired via an {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController AbortController}.
   */
  signal?: Request['signal'];
}
