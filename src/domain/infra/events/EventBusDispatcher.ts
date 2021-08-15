import {
  BaseCommand,
  CommandResponse,
  makeCommandResponse,
} from "../command/Command";
import { CommandBusMiddleware, Middleware } from "../middlewares/Middleware";
import { EventName } from "../Events";
import { BaseEvent } from "./Event";

export class EventBusDispatcher
  extends Middleware
  implements CommandBusMiddleware
{
  handlers: Array<{ event: EventName; handler: (event: any) => void }> = [];

  addHandler<P extends BaseEvent>(handler: (event: P) => void) {
    return {
      toHandleEvent: (event: EventName) => {
        // dont add if the handler is already registered
        const registeredHandlersForThisEvent = this.handlers.filter(
          (h) => h.event === event
        );
        if (
          !registeredHandlersForThisEvent.find((h) => h.handler === handler)
        ) {
          this.handlers.push({ event, handler });
        }
        return this;
      },
    };
  }
  dispatch(command: BaseCommand) {
    if (this._next) {
      const r = this._next.dispatch(command);
      const events = r.events || [];
      for (let event of events) {
        // find all the handlers for this event
        const handlers = this.handlers.filter((h) => h.event === event.type);
        // Call them (and ignore the result, since an evtn handler returns void)
        handlers.forEach((h) => h.handler(event));
      }
      return r;
    } else {
      return makeCommandResponse.withError(
        "The event bus dispatcher should be registered after the command bus"
      );
    }
  }
}
