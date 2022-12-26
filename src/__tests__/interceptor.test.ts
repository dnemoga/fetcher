import { Interceptor } from '../interceptor.js';

// Mocks
import 'environment';

describe('Interceptor', () => {
  let interceptor: Interceptor<number>;

  beforeEach(() => {
    interceptor = new Interceptor();
  });

  const increment = jest.fn<Promise<number>, [target: number]>(
    (target) => Promise.resolve(target + 1)
  );

  const decrement = jest.fn<Promise<number>, [target: number]>(
    (target) => Promise.resolve(target - 1)
  );

  beforeEach(() => {
    interceptor.use(increment);
    interceptor.use(decrement);
  });

  afterEach(() => {
    increment.mockClear();
    decrement.mockClear();
  });

  describe('.use(handler)', () => {
    it('registers handler', () => {
      expect(interceptor.handlers).toContain(increment);
      expect(interceptor.handlers).toContain(decrement);
    });
  });

  describe('.eject(handler)', () => {
    it('unregisters handler', () => {
      interceptor.eject(increment);
      interceptor.eject(decrement);

      expect(interceptor.handlers).not.toContain(increment);
      expect(interceptor.handlers).not.toContain(decrement);
    });
  });

  describe('.intercept(target)', () => {
    it('returns intercepted target', async () => {
      const result = await interceptor.intercept(0);

      expect(increment).toHaveBeenCalledWith(0);
      expect(decrement).toHaveBeenCalledWith(1);

      expect(result).toBe(0);
    });
  });
});
