export type Handler<T> = (target: T) => Promise<T>;

export class Interceptor<T> {
  readonly #handlers = new Set<Handler<T>>();

  use(handler: Handler<T>): void {
    this.#handlers.add(handler);
  }

  eject(handler: Handler<T>): void {
    this.#handlers.delete(handler);
  }

  async intercept(target: T): Promise<T> {
    for await (const handler of this.#handlers) {
      target = await handler(target);
    }

    return target;
  }
}
