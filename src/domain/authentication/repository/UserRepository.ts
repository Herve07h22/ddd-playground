import { User } from "../entities/User";

export interface UserRepository {
  getUserByToken: (token: string) => User | undefined;
}
