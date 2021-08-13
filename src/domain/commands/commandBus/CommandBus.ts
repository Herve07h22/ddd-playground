import { CommandResponse, GenericCommand, makeCommandResponse } from "./Command"
import { CommandBusMiddleware } from "../middlewares/Middleware"

export class CommandBus {
    private _rootMiddleware:  CommandBusMiddleware | null = null
    add (middleware:CommandBusMiddleware) {
        if (this._rootMiddleware) {
            middleware.then(this._rootMiddleware)
        } 
        this._rootMiddleware = middleware
        
        return this
    }
    execute (command: GenericCommand):CommandResponse {
        if (this._rootMiddleware) {
            return this._rootMiddleware.dispatch(command)
        }
        return makeCommandResponse.withError("Nothing to do...")
    }
}
