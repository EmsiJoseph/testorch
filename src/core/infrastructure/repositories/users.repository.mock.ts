import { IUsersRepository } from "@/core/application/interfaces/repositories/users.repository.interface";
import { User, NewUser } from "@/core/entities/models/user";
import { hashSync } from "@node-rs/argon2";
import { DatabaseOperationError } from "@/core/entities/errors/common";

export class MockUsersRepository implements IUsersRepository {
  private _users: User[];

  constructor() {
    const hashOptions = {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    };

    this._users = [
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password_hash: hashSync("password123", hashOptions),
      },
      {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        password_hash: hashSync("password456", hashOptions),
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this._users.find((u) => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this._users.find((u) => u.email === email);
  }

  async createUser(input: User): Promise<User> {
    const newUser: User = {
      ...input,
    };
    this._users.push(newUser);
    return newUser;
  }
}