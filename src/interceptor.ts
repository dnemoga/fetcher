export type Handler<T> = (target: T) => Promise<T>;

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

  async intercept(target: T): Promise<T> {
    for await (const next of this.#handlers) {
      target = await next(target);
    }

    return target;
  }
}
