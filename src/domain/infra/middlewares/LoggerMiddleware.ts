import { BaseCommand, makeCommandResponse } from "../command/Command";
import { CommandBusMiddleware, Middleware } from "./Middleware";

export enum LoggingLevel {
  error = 1,
  info = 2,
  debug = 3,
}

export class LoggerMiddleware
  extends Middleware
  implements CommandBusMiddleware
{
  constructor(private level: LoggingLevel = LoggingLevel.error) {
    super();
  }
  dispatch(command: BaseCommand) {
    if (this.level > 1) {
      console.log("[Logger] Executing command :", command.type);
    }
    if (this.level > 2) {
      console.log("[Logger] details of the command :", {
        ...command,
        token: command.token ? "*******" : "not provided",
      });
    }
    if (this._next) {
      const r = this._next.dispatch(command);
      if (r.status === "error") {
        console.log("Error :", r.error);
      } else {
        if (this.level > 2) {
          console.log("Results :", r.value);
          console.log("Events :", r.events);
        }
      }
      return r;
    }
    return makeCommandResponse.withNoValue();
  }
}
