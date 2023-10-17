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
    const returnValue = isReadableStream(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isBlob(value)', () => {
  describe('when `value` is an instance of Blob', () => {
    // Parameters
    const value = new Blob();

    // Subject
    const returnValue = isBlob(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isBufferSource(value)', () => {
  describe('when `value` is an instance of ArrayBufferView', () => {
    // Parameters
    const value = new DataView(new ArrayBuffer(0));

    // Subject
    const returnValue = isBufferSource(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });

  describe('when `value` is an instance of ArrayBuffer', () => {
    // Parameters
    const value = new ArrayBuffer(0);

    // Subject
    const returnValue = isBufferSource(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isFormData(value)', () => {
  describe('when `value` is an instance of FormData', () => {
    // Parameters
    const value = new FormData();

    // Subject
    const returnValue = isFormData(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isURLSearchParams(value)', () => {
  describe('when `value` is an instance of URLSearchParams', () => {
    // Parameters
    const value = new URLSearchParams();

    // Subject
    const returnValue = isURLSearchParams(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isString(value)', () => {
  describe('when `value` is a string', () => {
    // Parameters
    const value = 'text';

    // Subject
    const returnValue = isString(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isNull(value)', () => {
  describe('when `value` is null', () => {
    // Parameters
    const value = null;

    // Subject
    const returnValue = isNull(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});

describe('isUndefined(value)', () => {
  describe('when `value` is undefined', () => {
    // Parameters
    const value = undefined;

    // Subject
    const returnValue = isUndefined(value);

    it('returns `true`', () => {
      expect(returnValue).toBe(true);
    });
  });
});
