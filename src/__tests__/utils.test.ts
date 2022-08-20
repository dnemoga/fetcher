import {
  // isReadableStream,
  // isBlob,
  isBufferSource,
  // isFormData,
  // isURLSearchParams,
  isString,
  isNull,
  isUndefined
} from '../utils';

describe('isBufferSource(value)', () => {
  describe('when passed value is an instance of ArrayBuffer', () => {
    it('returns `true`', () => {
      expect(isBufferSource(new ArrayBuffer(0))).toBe(true);
    });
  });

  describe('when passed value is an instance of DataView', () => {
    it('returns `true`', () => {
      expect(isBufferSource(new DataView(new ArrayBuffer(0)))).toBe(true);
    });
  });
});

describe('isString(value)', () => {
  describe('when passed value is a string', () => {
    it('returns `true`', () => {
      expect(isString('foobar')).toBe(true);
    });
  });
});

describe('isNull(value)', () => {
  describe('when passed value is null', () => {
    it('returns `true`', () => {
      expect(isNull(null)).toBe(true);
    });
  });
});

describe('isUndefined(value)', () => {
  describe('when passed value is undefined', () => {
    it('returns `true`', () => {
      expect(isUndefined(undefined)).toBe(true);
    });
  });
});
