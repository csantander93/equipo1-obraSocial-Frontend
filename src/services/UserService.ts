import { httpServer } from "../clients/server";
import { TSignIn } from "../models/types/requests/TSignIn";

export default class UserService {
  static usersController = "/usuarios";

  static login(signInForm: TSignIn) {

    return httpServer.post(`${this.usersController}/login`, signInForm);
  }

}
