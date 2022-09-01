/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */

globalThis.ReadableStream = class {
  constructor(...params: unknown[]) { }
} as typeof ReadableStream;

globalThis.Blob = class {
  constructor(...params: unknown[]) { }
} as typeof Blob;

globalThis.FormData = class {
  constructor(...params: unknown[]) { }
} as typeof FormData;

globalThis.URL = class {
  constructor(...params: unknown[]) { }
} as typeof URL;

globalThis.URLSearchParams = class {
  constructor(...params: unknown[]) { }
} as typeof URLSearchParams;
