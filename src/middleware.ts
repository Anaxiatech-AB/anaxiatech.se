export function onRequest(_ctx: unknown, next: () => Promise<Response>): Promise<Response> {
  return next();
}
