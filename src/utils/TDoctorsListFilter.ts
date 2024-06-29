// utils/filterDoctorsBySpecialty.ts
import { TDoctor } from '../models/types/entities/TDoctor';

export const filterDoctorsBySpecialty = (doctors: TDoctor[], specialty: string): TDoctor[] => {
  return doctors.filter(doctor => doctor.nombreEspecialidad === specialty);
};
