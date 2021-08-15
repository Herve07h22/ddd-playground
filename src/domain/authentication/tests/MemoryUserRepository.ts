import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

export class MemoryUserRepository implements UserRepository {
  getUserByToken(token: string) {
    if (token) {
      return { name: "John Doe", role: "patient" } as User;
    }
  }
}
