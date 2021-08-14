import { NamedAuthenticatedCommand } from "../commands/commandBus/Command";

export type AddASlotCommand = NamedAuthenticatedCommand<
  "Add a slot",
  {
    slot: Date;
    doctor: string;
  }
>;
