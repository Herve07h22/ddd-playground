import { CommandResponse, GenericCommand } from "../commandBus/Command"

export interface CommandBusMiddleware {
    then : (next:  CommandBusMiddleware) => void,
    dispatch: (command: GenericCommand) => CommandResponse
}

export class Middleware {
    protected _next:  CommandBusMiddleware | null = null
    then (middleware: CommandBusMiddleware) { this._next = middleware}
}
