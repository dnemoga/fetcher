import { CommonOptions } from './common-options';

export interface RequestOptions extends CommonOptions {
  data?: BodyInit | null;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}
