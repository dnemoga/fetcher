import { Fetcher } from '../fetcher';
import { Interceptor } from '../interceptor';

describe('Fetcher', () => {
  let fetcher: Fetcher;

  beforeEach(() => {
    fetcher = new Fetcher();
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
});
