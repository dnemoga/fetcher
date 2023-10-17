# @dnemoga/fetcher
[![](https://img.shields.io/github/actions/workflow/status/dnemoga/fetcher/build-pipeline.yml?label=Build%20Pipeline&style=flat-square)](https://github.com/dnemoga/fetcher/actions/workflows/build-pipeline.yml)
[![](https://img.shields.io/github/actions/workflow/status/dnemoga/fetcher/quality-gate.yml?label=Quality%20Gate&style=flat-square)](https://github.com/dnemoga/fetcher/actions/workflows/quality-gate.yml)
[![](https://img.shields.io/codecov/c/github/dnemoga/fetcher?label=Code%20Coverage&style=flat-square)](https://app.codecov.io/gh/dnemoga/fetcher)

A minimalistic library built around the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) with zero dependencies.

## Getting Started
### Installation
```sh
npm install @dnemoga/fetcher
```

### Importing
```ts
import { Fetcher } from '@dnemoga/fetcher';
```

### Creating Instance
```ts
const fetcher = new Fetcher({ /* Fetcher Options */ });
```

#### Fetcher Options
These options apply to every request outcoming from the current instance.
  - [`mode`](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) (default `cors`)
  - [`credentials`](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) (default `same-origin`)
  - [`cache`](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache) (default `default`)
  - [`redirect`](https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect) (default `follow`)
  - [`referrerPolicy`](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy) (default `strict-origin-when-cross-origin`)

### Making Request
```ts
fetcher.get('/resource', { /* Request Options */ })
  .then(console.log, console.error);
```

| Note: Supported methods are `get`, `head`, `post`, `put`, `patch`, and `delete`.

#### Request Options
  - `data`\
  Any [body](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body) that you want to add to your request. Note that a request using the `GET` or `HEAD` method cannot have a body.

  - `params`\
  Any search parameters you want to add to your request, contained within an object literal with string values.

  - `headers`\
  Any headers you want to add to your request, contained within an object literal with string values. Note that [some names are forbidden](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name).

  - `integrity`\
  Contains the [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) value of the request.

  - `keepalive`\
  The `keepalive` option can be used to allow the request to outlive the page. Fetch with the `keepalive` flag is a replacement for the [`Navigator.sendBeacon()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) API.

  - `signal`\
  An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) object instance; allows you to communicate with a fetch request and abort it if required via an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Next Steps
### Interceptors
#### `onRequest.use()`
```ts
const customHeaders = async (request) => {
  request.headers.set('X-Foo', 'Foo');
  request.headers.set('X-Bar', 'Bar');

  return request;
};

fetcher.onRequest.use(customHeaders);
```

#### `onRequest.eject()`
```ts
fetcher.onRequest.eject(customHeaders);
```

#### `onResponse.use()`
```ts
const errorHandler = async (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

fetcher.onResponse.use(errorHandler);
```

#### `onResponse.eject()`
```ts
fetcher.onResponse.eject(errorHandler);
```

### Request Timeout
```ts
fetcher.get('/resource', {
  signal: AbortSignal.timeout(30000)
});
```
