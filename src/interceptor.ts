export type Handler<T> = (value: T) => Promise<T>;

export class Interceptor<T> {
  readonly #handlers = new Set<Handler<T>>();

  get handlers(): Set<Handler<T>> {
    return this.#handlers;
  }

  use(handler: Handler<T>): void {
    this.#handlers.add(handler);
  }

  eject(handler: Handler<T>): void {
    this.#handlers.delete(handler);
  }

  async intercept(value: T): Promise<T> {
    for await (const next of this.#handlers) {
      value = await next(value);
    }

    return value;
  }
}
