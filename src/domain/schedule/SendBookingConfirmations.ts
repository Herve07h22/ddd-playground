import { User } from "../authentication/User";
import { UserRepository } from "../authentication/UserRepository";
import { Event } from "../commands/events/Event";
import { EmailService } from "./EmailService";

export type SlotBooked = Event<
  "Slot booked",
  {
    slot: Date;
    doctor: string;
    user: User;
  }
>;


export const SendBookingConfirmations =
  (emailService: EmailService, userRepository: UserRepository) =>
  (event: SlotBooked) => {
    emailService.sendMail(event.payload.user.name, "Your booking has been confirmed")
  };
