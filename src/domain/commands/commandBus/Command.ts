import { User } from "../../authentication/User";
import { CommandName } from "../Commands";

export type CommandResponse = {
  status: "ok" | "error";
  value?: any;
  error?: string;
};

export const makeCommandResponse = {
  withValue: (value: any) => {
    const r: CommandResponse = { status: "ok", value, error: "" };
    return r;
  },
  withError: (error: string) =>
    ({ status: "error", error, value: "" } as CommandResponse),
  withNoValue: () =>
    ({ status: "ok", value: "", error: "" } as CommandResponse),
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
