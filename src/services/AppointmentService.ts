import { httpServer } from '../clients/server';
import { TAppointment } from '../models/types/entities/TAppointment';
import { TUser } from '../models/types/entities/TUser';
import { TAppointmentAssign } from '../models/types/requests/TAppointmentAssign';
import { TRecipeDelete } from '../models/types/requests/TRecipeDelete'; 

export default class AppointmentService {
  private static appointmentsController = "/turnos";

  static async getAppointmentListUser(user: TUser): Promise<TAppointment[]> {
    try {
      const response = await httpServer.get<TAppointment[]>(`${this.appointmentsController}/traerTurnosPorIdUsuario/${user.id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async cancelAppointment(dto: TRecipeDelete): Promise<void> {
    try {
      await httpServer.delete(`${this.appointmentsController}/darBajaTurno`, { data: dto });
    } catch (error) {
      throw error;
    }
  }

  static async getAppointmentListDoctor(idMedico: number): Promise<TAppointment[]> {
    try {
      const response = await httpServer.get<TAppointment[]>(`${this.appointmentsController}/traerTurnosDisponiblesMedico/${idMedico}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async assignAppointmentUser(dto: TAppointmentAssign): Promise<void> {
    console.log(dto)
    try {
      await httpServer.put(`${this.appointmentsController}/asignarTurno`, dto );
    } catch (error) {
      throw error;
    }
  }
}