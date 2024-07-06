import { httpServer } from '../clients/server';
import { TAppointment } from '../models/types/entities/TAppointment';
import { TUser } from '../models/types/entities/TUser';
import { TAppointmentAssign } from '../models/types/requests/TAppointmentAssign';
import { TRecipeDelete } from '../models/types/requests/TRecipeDelete'; 
import { TAppointmentDate } from '../models/types/requests/TAppointmentDate';
import { TAppointmentEdit } from '../models/types/requests/TAppointmentEdit';

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
    try {
      await httpServer.put(`${this.appointmentsController}/asignarTurno`, dto );
    } catch (error) {
      throw error;
    }
  }

  static async createAppointment15Min(dto: TAppointmentDate): Promise<void> {
    try {
      await httpServer.post(`${this.appointmentsController}/crearTurnosMedicoFechaC15Min`, dto );
    } catch (error) {
      throw error;
    }
  }

  static async createAppointment20Min(dto: TAppointmentDate): Promise<void> {
    try {
      await httpServer.post(`${this.appointmentsController}/crearTurnosMedicoFechaC20Min`, dto );
    } catch (error) {
      throw error;
    }
  }

  static async editAppointment(dto: TAppointmentEdit): Promise<void> {
    
    try {
      console.log(dto);
      await httpServer.put(`${this.appointmentsController}/actualizarTurno`, dto);
    } catch (error) {
      throw error;
    }
  }

  
}