<<<<<<< HEAD
=======
// utils/filterDoctorsBySpecialty.ts
>>>>>>> rama_cris
import { TDoctor } from '../models/types/entities/TDoctor';

export const filterDoctorsBySpecialty = (doctors: TDoctor[], specialty: string): TDoctor[] => {
  return doctors.filter(doctor => doctor.nombreEspecialidad === specialty);
<<<<<<< HEAD
};
=======
};
>>>>>>> rama_cris
