import { BaseCommand, CommandResponse } from "./Command";
import { CommandBusMiddleware } from "../middlewares/Middleware";
import { CommandName } from "../Commands";

export class CommandBusDispatcher implements CommandBusMiddleware {
  handlers: Map<CommandName, (command: any) => CommandResponse> = new Map();
  then(middleware: CommandBusMiddleware) {
    throw new Error("The CommandBusDispatcher should be the last middleware");
  }
  addUseCase<P extends BaseCommand>(handler: (command: P) => CommandResponse) {
    return {
      toHandleCommand: (commandType: CommandName) => {
        this.handlers.set(commandType, handler);
        return this;
      },
    };
  }
  dispatch(command: BaseCommand) {
    // find all the handler for this command
    const handler = this.handlers.get(command.type);
    if (!handler)
      throw new Error(
        "Cannot find any handler for this command :" + command.type
      );
    return handler(command);
  }
}
