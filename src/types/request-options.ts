import { FetcherOptions } from './fetcher-options.js';

export interface RequestOptions extends FetcherOptions {
  data?: any;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  integrity?: Request['integrity'];
  keepalive?: Request['keepalive'];
  signal?: Request['signal'];
}
