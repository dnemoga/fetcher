# @dnemoga/fetcher
This library represents a minimalistic wrapper over the native Fetch API intended to use in web projects.

## Getting Started
```sh
npm i @dnemoga/fetch
```

```ts
import { Fetcher } from '@dnemoga/fetcher';

const httpClient = new Fetcher({
  mode: 'cors',
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  referrerPolicy: 'strict-origin-when-cross-origin'
});

const loadData = async () => {
  const response = await httpClient.get('/some-url', {
    params: { foo: 'bar' }
  });

  return response.json();
};

loadData();
```
