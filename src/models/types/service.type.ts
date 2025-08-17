export interface AppService<T = any> {
  handle(...args: any[]): Promise<T> | T;
}
