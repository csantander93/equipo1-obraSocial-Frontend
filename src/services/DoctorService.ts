// DoctorService.ts
import { httpServer } from '../clients/server';
import { TDoctor } from '../models/types/entities/TDoctor';

export default class DoctorService {
  private static doctorsController = "/medicos";

  static async getDoctorList(): Promise<TDoctor[]> {
    try {
      const response = await httpServer.get<TDoctor[]>(`${this.doctorsController}/cartillaMedicos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
