import type { User } from "../types/user.ts";
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from "../types/errors.ts";

export function isKnownError(
  error: unknown
): error is BadRequestError | NotFoundError | InternalError {
  return [BadRequestError, NotFoundError, InternalError].some(
    (e) => error instanceof e
  );
}

export function isUser(object: any): object is User {
  return (
    ["password", "name", "index"].filter((key) => !Object.hasOwn(object, key))
      .length === 0
  );
}
