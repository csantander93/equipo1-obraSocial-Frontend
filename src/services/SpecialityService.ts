import { httpServer } from '../clients/server';
import { TSpeciality } from '../models/types/entities/TSpeciality';

export default class SpecialityService {
  private static specialityController = "/especialidad";

  static async getSpecialityList(): Promise<TSpeciality[]> {
    try {
      const response = await httpServer.get<TSpeciality[]>(`${this.specialityController}/traerEspecialidades`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}