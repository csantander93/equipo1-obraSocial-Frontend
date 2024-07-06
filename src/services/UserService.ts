import { httpServer } from "../clients/server";
import { TSignIn } from "../models/types/requests/TSignIn";
import { TRegister } from "../models/types/requests/TRegister";
import { TUserPatient } from "../models/types/entities/TUserPatient";

export default class UserService {
  static usersController = "/usuarios";

  static login(signInForm: TSignIn) {

    return httpServer.post(`${this.usersController}/login`, signInForm);
  }

  static register(registerForm: TRegister) {
    return httpServer.post(`${this.usersController}/registro`, registerForm);
  }

  static async getUserPatient(): Promise<TUserPatient[]> {
    try {
      const response = await httpServer.get<TUserPatient[]>(`${this.usersController}/traerUsuariosPaciente`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
