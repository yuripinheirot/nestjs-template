import {
  ConsoleLogger,
  Inject,
  Injectable,
  Optional,
  Scope,
} from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';



@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends ConsoleLogger {
  constructor(
    @Optional() @Inject(INQUIRER) private readonly inquirer?: object,
  ) {
    super();
    const ctx = (this.inquirer as any)?.constructor?.name ?? 'UnknownContext';
    this.setContext(ctx);
  }

  override log(message: string) {
    super.log(message);
  }
  override warn(message: string) {
    super.warn(message);
  }
  override error(message: string, trace?: string) {
    super.error(message, trace);
  }
}
