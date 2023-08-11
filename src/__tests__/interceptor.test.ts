import { Interceptor } from '../interceptor.js';

// Mocks
import 'environment';

describe('Interceptor()', () => {
  const interceptor = new Interceptor<number[]>();

  describe('.handlers', () => {
    it('is an instance of Set', () => {
      expect(interceptor.handlers).toBeInstanceOf(Set);
    });
  });

  describe('.use(handler)', () => {
    // Parameters
    const clone = jest.fn<Promise<number[]>, [value: number[]]>(
      (value) => Promise.resolve([...value])
    );

    // Subject
    beforeAll(() => {
      interceptor.use(clone);
    });

    // Cleanup
    afterAll(() => {
      interceptor.eject(clone);
    });

    it('adds `handler` to the interceptor', () => {
      expect(interceptor.handlers).toContain(clone);
    });
  });

  describe('.eject(handler)', () => {
    // Parameters
    const clone = jest.fn<Promise<number[]>, [value: number[]]>(
      (value) => Promise.resolve([...value])
    );

    // Setup
    beforeAll(() => {
      interceptor.use(clone);
    });

    // Subject
    beforeAll(() => {
      interceptor.eject(clone);
    });

    it('removes `handler` from the interceptor', () => {
      expect(interceptor.handlers).not.toContain(clone);
    });
  });

  describe('.intercept(value)', () => {
    // Parameters
    const sort = jest.fn<Promise<number[]>, [value: number[]]>(
      (value) => Promise.resolve([...value].sort())
    );

    const reverse = jest.fn<Promise<number[]>, [value: number[]]>(
      (value) => Promise.resolve([...value].reverse())
    );

    // Setup
    beforeAll(() => {
      interceptor.use(sort);
      interceptor.use(reverse);
    });

    // Subject
    let result: number[];

    beforeAll(async () => {
      result = await interceptor.intercept([1, 4, 2, 5, 3]);
    });

    // Cleanup
    afterAll(() => {
      interceptor.eject(sort);
      interceptor.eject(reverse);
    });

    it('sequentially calls all handlers', () => {
      expect(sort).toBeCalledTimes(1);
      expect(reverse).toBeCalledTimes(1);

      expect(sort.mock.invocationCallOrder[0]).toBe(1);
      expect(reverse.mock.invocationCallOrder[0]).toBe(2);
    });

    it('returns a result of calling handlers', () => {
      expect(result).toStrictEqual([5, 4, 3, 2, 1]);
    });
  });
});
