# @dnemoga/fetcher
A minimalistic library built around the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) with zero dependencies. Intended to use only in modern web browsers.

## Getting Started
### Installation
```sh
npm install @dnemoga/fetcher
```

### Creating Instance
```ts
import { Fetcher } from '@dnemoga/fetcher';

const fetcher = new Fetcher({
  // Options
});
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
const getResource = async () => {
  const response = await fetcher.get('/resource', {
    // Options
  });

  console.log(response);
};

getResource();
```

#### Request Options
- `data`\
Any [body](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body) that you want to add to your request. Note that a request using the `GET` or `HEAD` method cannot have a body.

- `params`\
An object literal with string values which will be serialized into a query string.

- `headers`\
Any headers you want to add to your request, contained within an object literal with string values. Note that [some names are forbidden](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name).

- `integrity`\
Contains the [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) value of the request.

- `keepalive`\
The `keepalive` option can be used to allow the request to outlive the page. Fetch with the `keepalive` flag is a replacement for the [`Navigator.sendBeacon()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) API.

- `signal`\
An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) object instance; allows you to communicate with a fetch request and abort it if desired via an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Next Steps
### Interceptors
```ts
fetcher.onRequest.use(async (request) => {
  request.headers.set('X-Foo', 'Foo');
  request.headers.set('X-Bar', 'Bar');

  return request;
});
```

### Error Handling
```ts
fetcher.onResponse.use(async (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
});

try {
  fetcher.get('/status/400');
} catch (error) {
  console.error(error);
}
```

| *Reference:* [Checking that the fetch was successful](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful)

### Request Timeout
```ts
try {
  fetcher.get('/resource', {
    signal: AbortSignal.timeout(30000)
  });
} catch (error) {
  console.error(error);
}
```

| *Reference:* [`AbortSignal.timeout()`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout)
