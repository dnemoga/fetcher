# @dnemoga/fetcher
This library represents a minimalistic wrapper over the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) intended to use in web projects.

## Getting Started
### Installation
```sh
npm i @dnemoga/fetch
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
- `data`
- `params`
- `headers`
- `integrity`
- `keepalive`
- `signal`

## Next Steps
### Interceptors
```ts
fetcher.onRequest.use((request) => {
  request.headers.set('X-Foo', 'Foo');
  request.headers.set('X-Bar', 'Bar');

  return request;
});
```

### Error Handling
```ts
fetcher.onResponse.use((response) => {
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

| Reference: [Checking that the fetch was successful](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful)

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

| Reference: [`AbortSignal.timeout()`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout)
