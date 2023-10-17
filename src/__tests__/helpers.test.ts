import {
  toPayload,
  toUrl
} from '../helpers.js';

// Mocks
import 'environment';

describe('toPayload(data)', () => {
  describe('when `data` is an instance of ReadableStream', () => {
    // Parameters
    const data = new ReadableStream();

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is an instance of Blob', () => {
    // Parameters
    const data = new Blob();

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is an instance of ArrayBuffer', () => {
    // Parameters
    const data = new ArrayBuffer(0);

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is an instance of DataView', () => {
    // Parameters
    const data = new DataView(new ArrayBuffer(0));

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is an instance of FormData', () => {
    // Parameters
    const data = new FormData();

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is an instance of URLSearchParams', () => {
    // Parameters
    const data = new URLSearchParams();

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is a string', () => {
    // Parameters
    const data = 'text';

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is null', () => {
    // Parameters
    const data = null;

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is undefined', () => {
    // Parameters
    const data = undefined;

    // Subject
    const returnValue = toPayload(data);

    it('returns body as is', () => {
      expect(returnValue).toStrictEqual({ body: data });
    });
  });

  describe('when `data` is another type', () => {
    // Parameters
    const data = { foo: 'bar', baz: 'qux' };

    // Subject
    const returnValue = toPayload(data);

    it('returns body as JSON string and adds `Content-Type` header', () => {
      expect(returnValue).toStrictEqual({
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },

        body: JSON.stringify(data)
      });
    });
  });
});

describe('toUrl(baseUrl, params)', () => {
  // Parameters
  const baseUrl = 'path', params = { foo: 'bar', baz: 'qux' };

  // Subject
  const returnValue = toUrl(baseUrl, params);

  it('returns composed URL string', () => {
    expect(returnValue).toBe(`${location.origin}/path?foo=bar&baz=qux`);
  });
});
