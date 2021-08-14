import {
  CommandHandler,
  makeCommandResponse,
  NamedAuthenticatedCommand,
} from "../commands/commandBus/Command";
import { SheduleRepository } from "./SheduleRepository";

export type BookASlotCommand = NamedAuthenticatedCommand<
  "Book a slot",
  {
    slot: Date;
    doctor: string;
  }
>;

export const BookASlotHandler: CommandHandler<BookASlotCommand> =
  (sheduleNotebook: SheduleRepository) => (command: BookASlotCommand) => {
    // Création ou obtention d'un aggrégat
    // Invoquer les méthodes de cet aggrégat
    // le faire persister
    if (!command.user) {
      return makeCommandResponse.withError(
        "A user must be logged in to book a slot"
      );
    }
    console.log("I do the stuff");
    return makeCommandResponse.withValue("Tout va bien");
  };
