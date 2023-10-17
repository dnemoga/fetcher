import { Interceptor } from '../interceptor.js';

// Mocks
import 'environment';

describe('Interceptor()', () => {
  // Subject
  const interceptor = new Interceptor<string>();

  describe('.handlers', () => {
    it('is an array of handlers', () => {
      expect(interceptor.handlers).toBeInstanceOf(Array);
    });
  });

  describe('.use(handler)', () => {
    // Parameters
    const identity = jest.fn<Promise<string>, [value: string]>(
      (value) => Promise.resolve(value)
    );

    // Action
    beforeAll(() => {
      interceptor.use(identity);
    });

    // Teardown
    afterAll(() => {
      interceptor.eject(identity);
    });

    it('adds `handler` to the interceptor', () => {
      expect(interceptor.handlers).toContain(identity);
    });
  });

  describe('.eject(handler)', () => {
    // Parameters
    const identity = jest.fn<Promise<string>, [value: string]>(
      (value) => Promise.resolve(value)
    );

    // Setup
    beforeAll(() => {
      interceptor.use(identity);
    });

    // Action
    beforeAll(() => {
      interceptor.eject(identity);
    });

    it('removes `handler` from the interceptor', () => {
      expect(interceptor.handlers).not.toContain(identity);
    });
  });

  describe('.intercept(value)', () => {
    // Parameters
    const addBar = jest.fn<Promise<string>, [value: string]>(
      (value) => Promise.resolve(`${value}, bar`)
    );

    const addBaz = jest.fn<Promise<string>, [value: string]>(
      (value) => Promise.resolve(`${value}, baz`)
    );

    const addQux = jest.fn<Promise<string>, [value: string]>(
      (value) => Promise.resolve(`${value}, qux`)
    );

    // Subject
    let returnValue: string;

    // Setup
    beforeAll(() => {
      interceptor.use(addBar);
      interceptor.use(addBaz);
      interceptor.use(addQux);
    });

    // Action
    beforeAll(async () => {
      returnValue = await interceptor.intercept('foo');
    });

    // Teardown
    afterAll(() => {
      interceptor.eject(addBar);
      interceptor.eject(addBaz);
      interceptor.eject(addQux);
    });

    it('builds a pipeline and sequentially calls all handlers', async () => {
      expect(addBar.mock.invocationCallOrder[0]).toBe(1);
      expect(addBar.mock.calls[0][0]).toBe('foo');
      expect(await addBar.mock.results[0].value).toBe('foo, bar');

      expect(addBaz.mock.invocationCallOrder[0]).toBe(2);
      expect(addBaz.mock.calls[0][0]).toBe('foo, bar');
      expect(await addBaz.mock.results[0].value).toBe('foo, bar, baz');

      expect(addQux.mock.invocationCallOrder[0]).toBe(3);
      expect(addQux.mock.calls[0][0]).toBe('foo, bar, baz');
      expect(await addQux.mock.results[0].value).toBe('foo, bar, baz, qux');
    });

    it('returns the final result of calling handlers', () => {
      expect(returnValue).toBe('foo, bar, baz, qux');
    });
  });
});
