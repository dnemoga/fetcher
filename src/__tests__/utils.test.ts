import {
  isReadableStream,
  isBlob,
  isBufferSource,
  isFormData,
  isURLSearchParams,
  isString,
  isNull,
  isUndefined
} from '../utils.js';

// Mocks
import 'environment';

describe('isReadableStream(value)', () => {
  describe('when `value` is an instance of ReadableStream', () => {
    // Parameters
    const value = new ReadableStream();

    // Subject
    const result = isReadableStream(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isBlob(value)', () => {
  describe('when `value` is an instance of Blob', () => {
    // Parameters
    const value = new Blob();

    // Subject
    const result = isBlob(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isBufferSource(value)', () => {
  describe('when `value` is an instance of ArrayBuffer', () => {
    // Parameters
    const value = new ArrayBuffer(0);

    // Subject
    const result = isBufferSource(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });

  describe('when `value` is an instance of DataView', () => {
    // Parameters
    const value = new DataView(new ArrayBuffer(0));

    // Subject
    const result = isBufferSource(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isFormData(value)', () => {
  describe('when `value` is an instance of FormData', () => {
    // Parameters
    const value = new FormData();

    // Subject
    const result = isFormData(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isURLSearchParams(value)', () => {
  describe('when `value` is an instance of URLSearchParams', () => {
    // Parameters
    const value = new URLSearchParams();

    // Subject
    const result = isURLSearchParams(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isString(value)', () => {
  describe('when `value` is a string', () => {
    // Parameters
    const value = 'text';

    // Subject
    const result = isString(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isNull(value)', () => {
  describe('when `value` is null', () => {
    // Parameters
    const value = null;

    // Subject
    const result = isNull(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});

describe('isUndefined(value)', () => {
  describe('when `value` is undefined', () => {
    // Parameters
    const value = undefined;

    // Subject
    const result = isUndefined(value);

    it('returns `true`', () => {
      expect(result).toBe(true);
    });
  });
});
