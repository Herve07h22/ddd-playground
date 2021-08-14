import { BookASlotCommand, BookASlotHandler } from "./BookASlot";
import { CommandBus } from "../commands/commandBus/CommandBus";
import { CommandBusDispatcher } from "../commands/commandBus/CommandBusDispatcher";
import { LoggerMiddleware } from "../commands/middlewares/LoggerMiddleware";
import { TransactionManager } from "../commands/middlewares/TransactionManager";
import { AuthenticationMiddleware } from "../commands/middlewares/AuthenticationMiddleware";
import { MemoryUserRepository } from "../authentication/MemoryUserRepository";

class MemoryScheduleRepository implements MemoryScheduleRepository {}

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
  // Fake repositories
  const sheduleNotebook = new MemoryScheduleRepository();
  const userRepository = new MemoryUserRepository();

  // The command Bus dispatcher is the middleware that handles the incoming commands
  const commandBusDispatcher = new CommandBusDispatcher();
  // We just add 1 handler to the command Bus dispatcher
  commandBusDispatcher
    .addUseCase(BookASlotHandler(sheduleNotebook))
    .toHandleCommand("Book a slot");

  // It's easy to add more middlewares to the bus
  const commandBus = new CommandBus()
    .addMiddleware(commandBusDispatcher)
    .addMiddleware(new LoggerMiddleware())
    .addMiddleware(new AuthenticationMiddleware(userRepository))
    .addMiddleware(new TransactionManager());

  // Now the system is wired. Let's test an incoming command
  const command: BookASlotCommand = {
    type: "Book a slot",
    token: "verysecrettoken",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
  };
  const response = commandBus.execute(command);
  expect(response.status).toEqual("ok");
});
