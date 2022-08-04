export interface FetcherOptions {
  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/mode Request.mode}
   */
  mode?: Request['mode'];

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials Request.credentials}
   */
  credentials?: Request['credentials'];

  /**
   *  @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/cache Request.cache}
   */
  cache?: Request['cache'];

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect Request.redirect}
   */
  redirect?: Request['redirect'];

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy Request.referrerPolicy}
   */
  referrerPolicy?: Request['referrerPolicy'];
}
