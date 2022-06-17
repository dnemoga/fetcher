import { CommonOptions } from './common-options';

export interface RequestOptions extends CommonOptions {
  data?: any;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  integrity?: Request['integrity'];
  signal?: Request['signal'];
}
