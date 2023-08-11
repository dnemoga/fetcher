export function isReadableStream(value: unknown): value is ReadableStream {
  return value instanceof ReadableStream;
}

export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}

export function isBufferSource(value: unknown): value is BufferSource {
  return ArrayBuffer.isView(value) || value instanceof ArrayBuffer;
}

export function isFormData(value: unknown): value is FormData {
  return value instanceof FormData;
}

export function isURLSearchParams(value: unknown): value is URLSearchParams {
  return value instanceof URLSearchParams;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
