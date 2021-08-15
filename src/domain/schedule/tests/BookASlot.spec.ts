import { BookASlotCommand, BookASlotHandler } from "../commands/BookASlot";
import { MemoryUserRepository } from "../../authentication/tests/MemoryUserRepository";
import { FakeEmailService } from "../../services/email/FakeEmailService";
import { MemoryScheduleRepository } from "./MemoryScheduleRepository";
import { App } from "../../app";

it("An unregistered user cannot book a slot", () => {
  const shedule = new MemoryScheduleRepository();
  const handler = BookASlotHandler({ shedule: shedule });
  const command: BookASlotCommand = {
    type: "Book a slot",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
  };
  const response = handler(command);
  expect(response.status).toEqual("error");
});

it("A registered user can book a free slot with Dr Frankenstein", () => {
  const shedule = new MemoryScheduleRepository();
  const handler = BookASlotHandler({ shedule: shedule });
  const command: BookASlotCommand = {
    type: "Book a slot",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
    user: {
      name: "John Doe",
      role: "Patient",
    },
  };
  const response = handler(command);
  expect(response.status).toEqual("ok");
});

it("It's easy to register some middlewares to the command bus", () => {
  const app = App({
    sheduleNotebook: new MemoryScheduleRepository(),
    userRepository: new MemoryUserRepository(),
    emailService: new FakeEmailService(),
  });

  // Now the system is wired. Let's test an incoming command
  const command: BookASlotCommand = {
    type: "Book a slot",
    token: "verysecrettoken",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
  };
  const response = app.run(command);
  expect(response.status).toEqual("ok");
});
