import { User } from "./User";

export interface UserRepository {
  getUserByToken: (token: string) => User | undefined;
}
