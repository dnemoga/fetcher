import { Interceptor } from '../interceptor';

describe('Interceptor', () => {
  let interceptor: Interceptor<string>;

  const addFoo = jest.fn<Promise<string>, [target: string]>(
    (target) => Promise.resolve(target + 'foo')
  );

  const addBar = jest.fn<Promise<string>, [target: string]>(
    (target) => Promise.resolve(target + 'bar')
  );

  beforeEach(() => {
    interceptor = new Interceptor();

    interceptor.use(addFoo);
    interceptor.use(addBar);
  });

  afterEach(() => {
    addFoo.mockClear();
    addBar.mockClear();
  });

  describe('.use(handler)', () => {
    it('registers handler', () => {
      expect(interceptor.handlers).toContain(addFoo);
      expect(interceptor.handlers).toContain(addBar);
    });
  });

  describe('.eject(handler)', () => {
    it('unregisters handler', () => {
      interceptor.eject(addFoo);
      interceptor.eject(addBar);

      expect(interceptor.handlers).not.toContain(addFoo);
      expect(interceptor.handlers).not.toContain(addBar);
    });
  });

  describe('.intercept(target)', () => {
    it('returns intercepted target', async () => {
      const result = await interceptor.intercept('');

      expect(addFoo).toHaveBeenCalledWith('');
      expect(addBar).toHaveBeenCalledWith('foo');

      expect(result).toBe('foobar');
    });
  });
});
