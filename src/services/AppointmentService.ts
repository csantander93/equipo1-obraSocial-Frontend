// DoctorService.ts
import { httpServer } from '../clients/server';
import { TAppointment } from '../models/types/entities/TAppointment';

export default class AppointmentService {
  private static appointmentsController = "/turnos";

  static async getAppointmentList(idUsuario: number): Promise<TAppointment[]> {
    try {
      const response = await httpServer.get<TAppointment[]>(`${this.appointmentsController}/traerTurnosPorIdUsuario/${idUsuario}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
