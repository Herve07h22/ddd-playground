import { User } from "./User";
import { UserRepository } from "./UserRepository";

export class MemoryUserRepository implements UserRepository {
  getUserByToken(token: string) {
    if (token) {
      return { name: "John Doe", role: "patient" } as User;
    }
  }
}
