export interface InterceptorHandler<T> {
  (target: T): Promise<T>;
}

export class Interceptor<T> {
  readonly #handlers: Set<InterceptorHandler<T>> = new Set();

  use(handler: InterceptorHandler<T>): void {
    this.#handlers.add(handler);
  }

  eject(handler: InterceptorHandler<T>): void {
    this.#handlers.delete(handler);
  }

  async intercept(target: T): Promise<T> {
    for await (const handler of this.#handlers) {
      target = await handler(target);
    }

    return target;
  }
}
