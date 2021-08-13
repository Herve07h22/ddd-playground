import { GenericCommand, CommandResponse } from "./Command"
import { CommandType } from "../Commands"
import { CommandBusMiddleware } from "../middlewares/Middleware"

export class CommandBusDispatcher implements CommandBusMiddleware {
    handlers : Map<CommandType, (command:GenericCommand) => CommandResponse> = new Map()
    then (middleware: CommandBusMiddleware) { throw new Error ("The CommandBusDispatcher should be the last middleware") }
    add (handler:(command:GenericCommand) => CommandResponse) {
        return { toHandleCommand : (commandType:CommandType) => this.handlers.set(commandType, handler) }
    }
    dispatch (command: GenericCommand) {
        // find all the handler for this command
        const handler = this.handlers.get(command.type)
        if (!handler) throw new Error("Cannot find any handler for this command :" + command.type)
        return handler(command)
    }
}