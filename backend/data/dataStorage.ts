import { randomUUID } from "crypto";
import type { User } from "../types/user.ts";
import { BadRequestError, NotFoundError } from "../types/errors.ts";
import { isUser } from "../utils/typeguards.ts";
import type { LoginData } from "../types/dates.ts";

class UserStorage {
  users: User[] = [];

  isUUID = (value: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  };

  updateUsers = (value: User[]) => {
    this.users = value;
  };

  findUserByName(name: string, throwError?: boolean) {
    const index = this.users.findIndex((value) => value.name == name);
    if (throwError && index === -1) throw new NotFoundError();
    return this.users[index];
  }

  findUserById(userId: string, throwError?: boolean) {
    if (!this.isUUID(userId)) throw new BadRequestError();
    const index = this.users.findIndex((value) => value.id == userId);
    if (index === -1) throw new NotFoundError();
    return index;
  }

  getUsers() {
    return this.users;
  }

  createUser(body: LoginData) {
    const result = {
      ...body,
      index: randomUUID(),
      id: 0,
    };

    if (!isUser(result)) throw new BadRequestError();
    this.users.push(result);
    return result;
  }

  updateUser(name: string, body: string) {
    let user = this.findUserByName(name);

    const obj = JSON.parse(body);
    user = {
      ...user,
      ...obj,
      index: user.index,
    };
    this.users[this.findUserById(user.id)] = user;
    return user;
  }
}

export { UserStorage };
