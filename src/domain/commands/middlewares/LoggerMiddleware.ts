import { GenericCommand, makeCommandResponse } from "../commandBus/Command"
import { CommandBusMiddleware, Middleware } from "./Middleware"

export class LoggerMiddleware extends Middleware implements CommandBusMiddleware {
    dispatch (command: GenericCommand) {
        console.log("[Logger] Executing command :", command)
        if (this._next) {
            const r = this._next.dispatch(command)
            if (r.status === "error") {
                console.log("Error :", r.error)
            }
            return r
        }
        return makeCommandResponse.withNoValue()
    }
}
