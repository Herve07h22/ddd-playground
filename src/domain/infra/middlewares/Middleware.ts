import { BaseCommand, CommandResponse } from "../command/Command";

export interface CommandBusMiddleware {
  then: (next: CommandBusMiddleware) => void;
  dispatch: (command: BaseCommand) => CommandResponse;
}

export class Middleware {
  protected _next: CommandBusMiddleware | null = null;
  then(middleware: CommandBusMiddleware) {
    this._next = middleware;
  }
}
