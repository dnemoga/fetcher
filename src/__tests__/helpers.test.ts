import {
  toPayload,
  // toUrl
} from '../helpers';

// Mocks
import 'environment';

describe('toPayload(data)', () => {
  describe('when the data is an instance of ReadableStream', () => {
    const data = new ReadableStream();

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is an instance of Blob', () => {
    const data = new Blob();

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is an instance of ArrayBuffer', () => {
    const data = new ArrayBuffer(0);

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is an instance of DataView', () => {
    const data = new DataView(new ArrayBuffer(0));

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is an instance of FormData', () => {
    const data = new FormData();

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is an instance of URLSearchParams', () => {
    const data = new URLSearchParams();

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is a string', () => {
    const data = 'text';

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is null', () => {
    const data = null;

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });

  describe('when the data is undefined', () => {
    const data = undefined;

    it('returns body as is', () => {
      expect(toPayload(data)).toStrictEqual({ body: data });
    });
  });
});
