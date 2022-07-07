# @dnemoga/fetcher
This library represents a minimalistic wrapper over the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) intended to use in web projects.

## Getting Started
### Installation
```sh
npm i @dnemoga/fetch
```

### Creating Fetcher Instance
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

### Making Simple Request
```ts
const loadData = async () => {
  const response = await fetcher.get('/resource', {
    // Options
  });

  console.log(response);
};

loadData();
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
fetcher.interceptors.add((request) => {
  request.headers.set('X-Foo', 'Foo');
  request.headers.set('X-Bar', 'Bar');

  return request;
});
```

### Request Timeout
```ts
try {
  const response = await fetcher.get('/resource', {
    signal: AbortSignal.timeout(30000)
  });

  console.log(response);
} catch (error) {
  console.error(error); // AbortError
}
```
