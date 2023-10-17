import { Fetcher } from '../fetcher.js';

import { FetcherOptions } from '../types/fetcher-options.js';
import { RequestOptions } from '../types/request-options.js';

import { Interceptor } from '../interceptor.js';

// Mocks
import 'environment';

describe('Fetcher(options)', () => {
  // Subject
  const fetcher = new Fetcher();

  describe('.onRequest', () => {
    it('is an instance of Interceptor', () => {
      expect(fetcher.onRequest).toBeInstanceOf(Interceptor);
    });
  });

  describe('.onResponse', () => {
    it('is an instance of Interceptor', () => {
      expect(fetcher.onResponse).toBeInstanceOf(Interceptor);
    });
  });

  describe('when `options` is provided', () => {
    // Parameters
    const fetcherOptions: FetcherOptions = {
      mode: 'no-cors',
      credentials: 'omit',
      cache: 'no-cache',
      redirect: 'error',
      referrerPolicy: 'no-referrer'
    };

    // Subject
    const fetcher = new Fetcher(fetcherOptions);

    describe('.mode', () => {
      it('has a custom value', () => {
        expect(fetcher.mode).toBe('no-cors');
      });
    });

    describe('.credentials', () => {
      it('has a custom value', () => {
        expect(fetcher.credentials).toBe('omit');
      });
    });

    describe('.cache', () => {
      it('has a custom value', () => {
        expect(fetcher.cache).toBe('no-cache');
      });
    });

    describe('.redirect', () => {
      it('has a custom value', () => {
        expect(fetcher.redirect).toBe('error');
      });
    });

    describe('.referrerPolicy', () => {
      it('has a custom value', () => {
        expect(fetcher.referrerPolicy).toBe('no-referrer');
      });
    });

    describe('.request(method, baseUrl, options)', () => {
      describe('when `options` is provided', () => {
        // Parameters
        const method = 'post', baseUrl = '/resource';

        const requestOptions: RequestOptions = {
          data: { foo: 'bar', baz: 'qux' },
          params: { foo: 'bar', baz: 'qux' },
          headers: { foo: 'bar', baz: 'qux' },
          integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC',
          keepalive: true,
          signal: new AbortController().signal,

          mode: 'cors',
          credentials: 'same-origin',
          cache: 'default',
          redirect: 'follow',
          referrerPolicy: 'strict-origin-when-cross-origin'
        };

        // Spies
        let fetch: jest.SpyInstance<ReturnType<typeof globalThis.fetch>, Parameters<typeof globalThis.fetch>>;

        let onRequest: jest.SpyInstance<ReturnType<typeof fetcher.onRequest.intercept>, Parameters<typeof fetcher.onRequest.intercept>>;
        let onResponse: jest.SpyInstance<ReturnType<typeof fetcher.onResponse.intercept>, Parameters<typeof fetcher.onResponse.intercept>>;

        // Subject
        let returnValue: Response;

        // Setup
        beforeAll(() => {
          fetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response());

          onRequest = jest.spyOn(fetcher.onRequest, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );

          onResponse = jest.spyOn(fetcher.onResponse, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );
        });

        // Action
        beforeAll(async () => {
          returnValue = await fetcher.request(method, baseUrl, requestOptions);
        });

        // Teardown
        afterAll(() => {
          fetch.mockRestore();

          onRequest.mockRestore();
          onResponse.mockRestore();
        });

        it('runs the `.onRequest` interceptor', () => {
          expect(onRequest).toBeCalledWith(expect.any(Request));
        });

        it('makes a request', async () => {
          expect(fetch).toBeCalledWith(await onRequest.mock.results[0].value);
        });

        it('runs the `.onResponse` interceptor', async () => {
          expect(onResponse).toBeCalledWith(await fetch.mock.results[0].value);
        });

        it('returns a response', async () => {
          expect(returnValue).toBe(await onResponse.mock.results[0].value);
        });
      });

      describe('when `options` is not provided', () => {
        // Parameters
        const method = 'post', baseUrl = '/resource';

        // Spies
        let fetch: jest.SpyInstance<ReturnType<typeof globalThis.fetch>, Parameters<typeof globalThis.fetch>>;

        let onRequest: jest.SpyInstance<ReturnType<typeof fetcher.onRequest.intercept>, Parameters<typeof fetcher.onRequest.intercept>>;
        let onResponse: jest.SpyInstance<ReturnType<typeof fetcher.onResponse.intercept>, Parameters<typeof fetcher.onResponse.intercept>>;

        // Subject
        let returnValue: Response;

        // Setup
        beforeAll(() => {
          fetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response());

          onRequest = jest.spyOn(fetcher.onRequest, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );

          onResponse = jest.spyOn(fetcher.onResponse, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );
        });

        // Action
        beforeAll(async () => {
          returnValue = await fetcher.request(method, baseUrl);
        });

        // Teardown
        afterAll(() => {
          fetch.mockRestore();

          onRequest.mockRestore();
          onResponse.mockRestore();
        });

        it('runs the `.onRequest` interceptor', () => {
          expect(onRequest).toBeCalledWith(expect.any(Request));
        });

        it('makes a request', async () => {
          expect(fetch).toBeCalledWith(await onRequest.mock.results[0].value);
        });

        it('runs the `.onResponse` interceptor', async () => {
          expect(onResponse).toBeCalledWith(await fetch.mock.results[0].value);
        });

        it('returns a response', async () => {
          expect(returnValue).toBe(await onResponse.mock.results[0].value);
        });
      });
    });
  });

  describe('when `options` is not provided', () => {
    // Subject
    const fetcher = new Fetcher();

    describe('.mode', () => {
      it('has a default value', () => {
        expect(fetcher.mode).toBe('cors');
      });
    });

    describe('.credentials', () => {
      it('has a default value', () => {
        expect(fetcher.credentials).toBe('same-origin');
      });
    });

    describe('.cache', () => {
      it('has a default value', () => {
        expect(fetcher.cache).toBe('default');
      });
    });

    describe('.redirect', () => {
      it('has a default value', () => {
        expect(fetcher.redirect).toBe('follow');
      });
    });

    describe('.referrerPolicy', () => {
      it('has a default value', () => {
        expect(fetcher.referrerPolicy).toBe('strict-origin-when-cross-origin');
      });
    });

    describe('.request(method, baseUrl, options)', () => {
      describe('when `options` is provided', () => {
        // Parameters
        const method = 'post', baseUrl = '/resource';

        const requestOptions: RequestOptions = {
          data: { foo: 'bar', baz: 'qux' },
          params: { foo: 'bar', baz: 'qux' },
          headers: { foo: 'bar', baz: 'qux' },
          integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC',
          keepalive: true,
          signal: new AbortController().signal,

          mode: 'no-cors',
          credentials: 'omit',
          cache: 'no-cache',
          redirect: 'error',
          referrerPolicy: 'no-referrer'
        };

        // Spies
        let fetch: jest.SpyInstance<ReturnType<typeof globalThis.fetch>, Parameters<typeof globalThis.fetch>>;

        let onRequest: jest.SpyInstance<ReturnType<typeof fetcher.onRequest.intercept>, Parameters<typeof fetcher.onRequest.intercept>>;
        let onResponse: jest.SpyInstance<ReturnType<typeof fetcher.onResponse.intercept>, Parameters<typeof fetcher.onResponse.intercept>>;

        // Subject
        let returnValue: Response;

        // Setup
        beforeAll(() => {
          fetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response());

          onRequest = jest.spyOn(fetcher.onRequest, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );

          onResponse = jest.spyOn(fetcher.onResponse, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );
        });

        // Action
        beforeAll(async () => {
          returnValue = await fetcher.request(method, baseUrl, requestOptions);
        });

        // Teardown
        afterAll(() => {
          fetch.mockRestore();

          onRequest.mockRestore();
          onResponse.mockRestore();
        });

        it('runs the `.onRequest` interceptor', () => {
          expect(onRequest).toBeCalledWith(expect.any(Request));
        });

        it('makes a request', async () => {
          expect(fetch).toBeCalledWith(await onRequest.mock.results[0].value);
        });

        it('runs the `.onResponse` interceptor', async () => {
          expect(onResponse).toBeCalledWith(await fetch.mock.results[0].value);
        });

        it('returns a response', async () => {
          expect(returnValue).toBe(await onResponse.mock.results[0].value);
        });
      });

      describe('when `options` is not provided', () => {
        // Parameters
        const method = 'post', baseUrl = '/resource';

        // Spies
        let fetch: jest.SpyInstance<ReturnType<typeof globalThis.fetch>, Parameters<typeof globalThis.fetch>>;

        let onRequest: jest.SpyInstance<ReturnType<typeof fetcher.onRequest.intercept>, Parameters<typeof fetcher.onRequest.intercept>>;
        let onResponse: jest.SpyInstance<ReturnType<typeof fetcher.onResponse.intercept>, Parameters<typeof fetcher.onResponse.intercept>>;

        // Subject
        let returnValue: Response;

        // Setup
        beforeAll(() => {
          fetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response());

          onRequest = jest.spyOn(fetcher.onRequest, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );

          onResponse = jest.spyOn(fetcher.onResponse, 'intercept').mockImplementation(
            (value) => Promise.resolve(value)
          );
        });

        // Action
        beforeAll(async () => {
          returnValue = await fetcher.request(method, baseUrl);
        });

        // Teardown
        afterAll(() => {
          fetch.mockRestore();

          onRequest.mockRestore();
          onResponse.mockRestore();
        });

        it('runs the `.onRequest` interceptor', () => {
          expect(onRequest).toBeCalledWith(expect.any(Request));
        });

        it('makes a request', async () => {
          expect(fetch).toBeCalledWith(await onRequest.mock.results[0].value);
        });

        it('runs the `.onResponse` interceptor', async () => {
          expect(onResponse).toBeCalledWith(await fetch.mock.results[0].value);
        });

        it('returns a response', async () => {
          expect(returnValue).toBe(await onResponse.mock.results[0].value);
        });
      });
    });
  });

  describe('.get(baseUrl, options)', () => {
    // Parameters
    const baseUrl = '/resource', options = {};

    // Spies
    let request: jest.SpyInstance<ReturnType<typeof fetcher.request>, Parameters<typeof fetcher.request>>;

    // Subject
    let returnValue: Response;

    // Setup
    beforeAll(() => {
      request = jest.spyOn(fetcher, 'request').mockResolvedValue(new Response());
    });

    // Action
    beforeAll(async () => {
      returnValue = await fetcher.get(baseUrl, options);
    });

    // Teardown
    afterAll(() => {
      request.mockRestore();
    });

    it('makes a GET request', () => {
      expect(request).toBeCalledWith('get', baseUrl, options);
    });

    it('returns a response', () => {
      expect(returnValue).toBeInstanceOf(Response);
    });
  });

  describe('.head(baseUrl, options)', () => {
    // Parameters
    const baseUrl = '/resource', options = {};

    // Spies
    let request: jest.SpyInstance<ReturnType<typeof fetcher.request>, Parameters<typeof fetcher.request>>;

    // Subject
    let returnValue: Response;

    // Setup
    beforeAll(() => {
      request = jest.spyOn(fetcher, 'request').mockResolvedValue(new Response());
    });

    // Action
    beforeAll(async () => {
      returnValue = await fetcher.head(baseUrl, options);
    });

    // Teardown
    afterAll(() => {
      request.mockRestore();
    });

    it('makes a HEAD request', () => {
      expect(request).toBeCalledWith('head', baseUrl, options);
    });

    it('returns a response', () => {
      expect(returnValue).toBeInstanceOf(Response);
    });
  });

  describe('.post(baseUrl, options)', () => {
    // Parameters
    const baseUrl = '/resource', options = {};

    // Spies
    let request: jest.SpyInstance<ReturnType<typeof fetcher.request>, Parameters<typeof fetcher.request>>;

    // Subject
    let returnValue: Response;

    // Setup
    beforeAll(() => {
      request = jest.spyOn(fetcher, 'request').mockResolvedValue(new Response());
    });

    // Action
    beforeAll(async () => {
      returnValue = await fetcher.post(baseUrl, options);
    });

    // Teardown
    afterAll(() => {
      request.mockRestore();
    });

    it('makes a POST request', () => {
      expect(request).toBeCalledWith('post', baseUrl, options);
    });

    it('returns a response', () => {
      expect(returnValue).toBeInstanceOf(Response);
    });
  });

  describe('.put(baseUrl, options)', () => {
    // Parameters
    const baseUrl = '/resource', options = {};

    // Spies
    let request: jest.SpyInstance<ReturnType<typeof fetcher.request>, Parameters<typeof fetcher.request>>;

    // Subject
    let returnValue: Response;

    // Setup
    beforeAll(() => {
      request = jest.spyOn(fetcher, 'request').mockResolvedValue(new Response());
    });

    // Action
    beforeAll(async () => {
      returnValue = await fetcher.put(baseUrl, options);
    });

    // Teardown
    afterAll(() => {
      request.mockRestore();
    });

    it('makes a PUT request', () => {
      expect(request).toBeCalledWith('put', baseUrl, options);
    });

    it('returns a response', () => {
      expect(returnValue).toBeInstanceOf(Response);
    });
  });

  describe('.patch(baseUrl, options)', () => {
    // Parameters
    const baseUrl = '/resource', options = {};

    // Spies
    let request: jest.SpyInstance<ReturnType<typeof fetcher.request>, Parameters<typeof fetcher.request>>;

    // Subject
    let returnValue: Response;

    // Setup
    beforeAll(() => {
      request = jest.spyOn(fetcher, 'request').mockResolvedValue(new Response());
    });

    // Action
    beforeAll(async () => {
      returnValue = await fetcher.patch(baseUrl, options);
    });

    // Teardown
    afterAll(() => {
      request.mockRestore();
    });

    it('makes a PATCH request', () => {
      expect(request).toBeCalledWith('patch', baseUrl, options);
    });

    it('returns a response', () => {
      expect(returnValue).toBeInstanceOf(Response);
    });
  });

  describe('.delete(baseUrl, options)', () => {
    // Parameters
    const baseUrl = '/resource', options = {};

    // Spies
    let request: jest.SpyInstance<ReturnType<typeof fetcher.request>, Parameters<typeof fetcher.request>>;

    // Subject
    let returnValue: Response;

    // Setup
    beforeAll(() => {
      request = jest.spyOn(fetcher, 'request').mockResolvedValue(new Response());
    });

    // Action
    beforeAll(async () => {
      returnValue = await fetcher.delete(baseUrl, options);
    });

    // Teardown
    afterAll(() => {
      request.mockRestore();
    });

    it('makes a DELETE request', () => {
      expect(request).toBeCalledWith('delete', baseUrl, options);
    });

    it('returns a response', () => {
      expect(returnValue).toBeInstanceOf(Response);
    });
  });
});
