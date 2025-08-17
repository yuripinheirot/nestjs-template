export interface AppControllerType<Payload = any, Response = any> {
  handle(...args: any[]): Response | Promise<Response>;
}
