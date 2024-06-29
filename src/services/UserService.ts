import { httpServer } from "../clients/server";
import { TSignIn } from "../models/types/requests/TSignIn";
import { TRegister } from "../models/types/requests/TRegister";

export default class UserService {
  static usersController = "/usuarios";

  static login(signInForm: TSignIn) {

    return httpServer.post(`${this.usersController}/login`, signInForm);
  }

  static register(registerForm: TRegister) {
    return httpServer.post(`${this.usersController}/registro`, registerForm);
  }

}
