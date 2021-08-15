import { NamedAuthenticatedCommand } from "../../infra/command/Command";

export type AddASlotCommand = NamedAuthenticatedCommand<
  "Add a slot",
  {
    slot: Date;
    doctor: string;
  }
>;
