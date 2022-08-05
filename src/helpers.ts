import { RequestOptions } from './types/request-options.js';

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

export function toPayload(data: Required<RequestOptions>['data']): Pick<RequestInit, 'headers' | 'body'> {
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

export function toUrl(baseUrl: string, params: Required<RequestOptions>['params']): URL {
  const url = new URL(baseUrl, location.origin);

  Object.entries(params).forEach(([name, value]) => {
    url.searchParams.append(name, value);
  });

  return url;
}
