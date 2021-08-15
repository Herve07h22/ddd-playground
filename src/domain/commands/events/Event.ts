import { EventName } from "../Events";

export interface Event<T extends EventName, P> {
    type: T;
    payload: P;
  }
  
  export type BaseEvent = Event<EventName, any>;
  