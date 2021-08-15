import {
  CommandHandler,
  makeCommandResponse,
  NamedAuthenticatedCommand,
} from "../../infra/command/Command";
import { SlotBooked } from "../events/SendBookingConfirmations";
import { SheduleRepository } from "../repository/SheduleRepository";

export type BookASlotCommand = NamedAuthenticatedCommand<
  "Book a slot",
  {
    slot: Date;
    doctor: string;
  }
>;

export const BookASlotHandler: CommandHandler<BookASlotCommand> =
  (sheduleNotebook: SheduleRepository) => (command: BookASlotCommand) => {
    if (!command.user) {
      return makeCommandResponse.withError(
        "A user must be logged in to book a slot"
      );
    }
    // Create or obtain an aggregate
    // Call the methods of this aggregate
    // Save it
    console.log("I do the stuff");

    const event: SlotBooked = {
      type: "Slot booked",
      payload: {
        slot: new Date("2021-01-01"),
        doctor: "Dr Frankenstein",
        user: command.user,
      },
    };
    return makeCommandResponse.withValue("Tout va bien", event);
  };
