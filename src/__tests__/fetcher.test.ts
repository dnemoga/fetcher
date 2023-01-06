import { Fetcher } from '../fetcher.js';
import { Interceptor } from '../interceptor.js';

// Mocks
import 'environment';

describe('Fetcher(options)', () => {
  const fetcher = new Fetcher();

  describe('when `options` is provided', () => {
    const customFetcher = new Fetcher({
      mode: 'no-cors',
      credentials: 'omit',
      cache: 'no-cache',
      redirect: 'error',
      referrerPolicy: 'no-referrer'
    });

    describe('.mode', () => {
      it('has a custom value', () => {
        expect(customFetcher.mode).toBe('no-cors');
      });
    });

    describe('.credentials', () => {
      it('has a custom value', () => {
        expect(customFetcher.credentials).toBe('omit');
      });
    });

    describe('.cache', () => {
      it('has a custom value', () => {
        expect(customFetcher.cache).toBe('no-cache');
      });
    });

    describe('.redirect', () => {
      it('has a custom value', () => {
        expect(customFetcher.redirect).toBe('error');
      });
    });

    describe('.referrerPolicy', () => {
      it('has a custom value', () => {
        expect(customFetcher.referrerPolicy).toBe('no-referrer');
      });
    });
  });

  describe('when `options` is not provided', () => {
    const defaultFetcher = new Fetcher();

    describe('.mode', () => {
      it('has a default value', () => {
        expect(defaultFetcher.mode).toBe('cors');
      });
    });

    describe('.credentials', () => {
      it('has a default value', () => {
        expect(defaultFetcher.credentials).toBe('same-origin');
      });
    });

    describe('.cache', () => {
      it('has a default value', () => {
        expect(defaultFetcher.cache).toBe('default');
      });
    });

    describe('.redirect', () => {
      it('has a default value', () => {
        expect(defaultFetcher.redirect).toBe('follow');
      });
    });

    describe('.referrerPolicy', () => {
      it('has a default value', () => {
        expect(defaultFetcher.referrerPolicy).toBe('strict-origin-when-cross-origin');
      });
    });
  });

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

  describe('.get(baseUrl, options)', () => {
    it.todo('makes a GET request');
  });

  describe('.head(baseUrl, options)', () => {
    it.todo('makes a HEAD request');
  });

  describe('.post(baseUrl, options)', () => {
    it.todo('makes a POST request');
  });

  describe('.put(baseUrl, options)', () => {
    it.todo('makes a PUT request');
  });

  describe('.patch(baseUrl, options)', () => {
    it.todo('makes a PATCH request');
  });

  describe('.delete(baseUrl, options)', () => {
    it.todo('makes a DELETE request');
  });
});
