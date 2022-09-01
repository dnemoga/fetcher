import {
  isReadableStream,
  isBlob,
  isBufferSource,
  isFormData,
  isURLSearchParams,
  isString,
  isNull,
  isUndefined
} from '../utils';

// Mocks
import 'environment';

describe('isReadableStream(value)', () => {
  describe('when the value is an instance of ReadableStream', () => {
    const value = new ReadableStream();

    it('returns `true`', () => {
      expect(isReadableStream(value)).toBe(true);
    });
  });
});

describe('isBlob(value)', () => {
  describe('when the value is an instance of Blob', () => {
    const value = new Blob();

    it('returns `true`', () => {
      expect(isBlob(value)).toBe(true);
    });
  });
});

describe('isBufferSource(value)', () => {
  describe('when the value is an instance of ArrayBuffer', () => {
    const value = new ArrayBuffer(0);

    it('returns `true`', () => {
      expect(isBufferSource(value)).toBe(true);
    });
  });

  describe('when the value is an instance of DataView', () => {
    const value = new DataView(new ArrayBuffer(0));

    it('returns `true`', () => {
      expect(isBufferSource(value)).toBe(true);
    });
  });
});

describe('isFormData(value)', () => {
  describe('when the value is an instance of FormData', () => {
    const value = new FormData();

    it('returns `true`', () => {
      expect(isFormData(value)).toBe(true);
    });
  });
});

describe('isURLSearchParams(value)', () => {
  describe('when the value is an instance of URLSearchParams', () => {
    const value = new URLSearchParams();

    it('returns `true`', () => {
      expect(isURLSearchParams(value)).toBe(true);
    });
  });
});

describe('isString(value)', () => {
  describe('when the value is a string', () => {
    const value = 'text';

    it('returns `true`', () => {
      expect(isString(value)).toBe(true);
    });
  });
});

describe('isNull(value)', () => {
  describe('when the value is null', () => {
    const value = null;

    it('returns `true`', () => {
      expect(isNull(value)).toBe(true);
    });
  });
});

describe('isUndefined(value)', () => {
  describe('when the value is undefined', () => {
    const value = undefined;

    it('returns `true`', () => {
      expect(isUndefined(value)).toBe(true);
    });
  });
});
