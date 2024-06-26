import { httpServer } from '../clients/server';
import { TAppointment } from '../models/types/entities/TAppointment';
import { TUser } from '../models/types/entities/TUser';

export default class AppointmentService {
  private static appointmentsController = "/turnos";

  static async getAppointmentList(user: TUser): Promise<TAppointment[]> {
    try {
      const response = await httpServer.get<TAppointment[]>(`${this.appointmentsController}/traerTurnosPorIdUsuario/${user.id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}