import { Command, CommandHandler, makeCommandResponse } from "../commands/commandBus/Command";

export type BookASlotCommand  = Command<'Book a slot', {
    slot:Date,
    name:string,
    doctor:string
}>


export const BookASlotHandler:CommandHandler<BookASlotCommand> = (dependencies :{}) => (command:BookASlotCommand) => {
    // Création ou obtention d'un aggrégat
        // Invoquer les méthodes de cet aggrégat
        // le faire persister
        return makeCommandResponse.withValue("Tout va bien")
}


