import { UserRepository } from "../../authentication/repository/UserRepository";
import { BaseCommand, makeCommandResponse } from "../command/Command";
import { CommandBusMiddleware, Middleware } from "./Middleware";

export class AuthenticationMiddleware
  extends Middleware
  implements CommandBusMiddleware
{
  constructor(private userRepository: UserRepository) {
    super();
  }
  dispatch(command: BaseCommand) {
    if (this._next) {
      if (command.token) {
        const token = command.token;
        const user = this.userRepository.getUserByToken(token);
        if (user) {
          console.log(
            "[Authentication] User successfully authenticated :",
            user.name
          );
          const commandWithUser = Object.assign({}, command, { user });
          return this._next.dispatch(commandWithUser);
        } else {
          console.log("[Authentication] Invalid token :", token);
        }
      } else {
        console.log("[Authentication] Anonymous");
      }
      return this._next.dispatch(command);
    }

    return makeCommandResponse.withNoValue();
  }
}
