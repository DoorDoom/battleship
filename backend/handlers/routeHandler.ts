import { UserStorage } from "../data/dataStorage.ts";
import type { LoginData } from "../types/dates.ts";
import { InternalError, NotFoundError } from "../types/errors.ts";
import type { CustomRequest } from "../types/requests.ts";
import { isKnownError } from "../utils/typeguards.ts";

export const routeHandler = (
  request: CustomRequest,
  userStorage: UserStorage
) => {
  try {
    switch (request.type) {
      case "reg":
        const result: any = { ...request };
        let user = userStorage.findUserByName(request.data.name);
        if (!user) {
          userStorage.createUser(request.data as LoginData);
          user = userStorage.findUserByName(request.data.name);
        }
        result.data = JSON.stringify({
          name: user.name,
          index: user.index,
          error: false,
          errorText: "",
        });
        return result;
      default:
        throw new NotFoundError();
    }
  } catch (error) {
    if (isKnownError(error)) throw error;
    throw new InternalError();
  }
};
