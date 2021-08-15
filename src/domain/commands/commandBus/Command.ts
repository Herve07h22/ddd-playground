import { User } from "../../authentication/User";
import { CommandName } from "../Commands";
import { BaseEvent } from "../events/Event";

export type CommandResponse = {
  status: "ok" | "error";
  value?: any;
  error?: string;
  events?: BaseEvent[]
};

export const makeCommandResponse = {
  withValue: (value: any, ...events:BaseEvent[]) => {
    const r: CommandResponse = { status: "ok", value, error: "", events };
    return r;
  },
  withError: (error: string) =>
    ({ status: "error", error, value: "", events:[] } as CommandResponse),
  withNoValue: (...events:BaseEvent[]) =>
    ({ status: "ok", value: "", error: "", events } as CommandResponse),
};

export type CommandHandler<T> = (dependencies: {}) => (
  command: T
) => CommandResponse;

export interface NamedCommand<T extends CommandName, P> {
  type: T;
  payload: P;
}

export interface NamedAuthenticatedCommand<T extends CommandName, P> {
  type: T;
  user?: User;
  token?: string;
  payload: P;
}

export type BaseCommand = NamedAuthenticatedCommand<CommandName, any>;
