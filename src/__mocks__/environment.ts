/* eslint-disable @typescript-eslint/no-extraneous-class */

globalThis.Blob = class { } as typeof Blob;
globalThis.FormData = class { } as typeof FormData;
globalThis.ReadableStream = class { } as typeof ReadableStream;
globalThis.URLSearchParams = class { } as typeof URLSearchParams;
