import type {NewUser, User} from "@/core/entities/models/user";

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(username: string): Promise<User | undefined>;
  createUser(input: NewUser): Promise<User>;
}
