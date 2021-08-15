import { User } from "../../authentication/entities/User";
import { UserRepository } from "../../authentication/repository/UserRepository";
import { Event } from "../../infra/events/Event";
import { EmailService } from "../../services/email/EmailService";

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
    emailService.sendMail(
      event.payload.user.name,
      "Your booking has been confirmed"
    );
  };
