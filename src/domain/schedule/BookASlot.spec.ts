import { BookASlotCommand, BookASlotHandler, } from "./BookASlot"
import { CommandBus } from "../commands/commandBus/CommandBus"
import { CommandBusDispatcher } from "../commands/commandBus/CommandBusDispatcher"
import { LoggerMiddleware } from "../commands/middlewares/LoggerMiddleware"
import { TransactionManager } from "../commands/middlewares/TransactionManager"

class MemoryScheduleRepository {}

it( "A user can book a free slot with Dr Frankenstein" ,  () => {
    const shedule = new MemoryScheduleRepository()
    const handler =  BookASlotHandler({shedule : shedule})
    const command:BookASlotCommand = {type:'Book a slot',payload: {slot:new Date("2021-01-01"), name:"John Doe", doctor:"Dr Frankenstein"}}
    const response = handler(command)
    expect(response.status).toEqual("ok")
})

it("It's easy to register some middlewares to the command bus" ,  () => {
    // Feke repository
    const shedule = new MemoryScheduleRepository()

    // The command Bus dispatcher is the middleware that handles the incoming commands
    const commandBusDispatcher = new CommandBusDispatcher()
    commandBusDispatcher.add(BookASlotHandler({shedule : shedule})).toHandleCommand("Book a slot")

    // It's easy to add any more middlewares to the bus
    const commandBus = new CommandBus()
                        .add(commandBusDispatcher)
                        .add(new LoggerMiddleware())
                        .add(new TransactionManager())
                        
    const command:BookASlotCommand = {type:'Book a slot',payload: {slot:new Date("2021-01-01"), name:"John Doe", doctor:"Dr Frankenstein"}}
    const response = commandBus.execute(command)
    expect(response.status).toEqual("ok")
})


