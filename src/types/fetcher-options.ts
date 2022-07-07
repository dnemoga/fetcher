export interface FetcherOptions {
  mode?: Request['mode'];
  credentials?: Request['credentials'];
  cache?: Request['cache'];
  redirect?: Request['redirect'];
  referrerPolicy?: Request['referrerPolicy'];
}
