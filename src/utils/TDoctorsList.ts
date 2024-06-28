import { TDoctor } from '../models/types/entities/TDoctor'; // Ajusta según tu estructura de datos

// Defino un tipo para representar la lista de médicos
type TDoctorsList = TDoctor[];

// Función para filtrar médicos por especialidad
export const filterDoctorsBySpeciality = (doctors: TDoctorsList, especialidadSeleccionada: string): TDoctorsList => {
  return doctors.filter(doctor => doctor.nombreEspecialidad === especialidadSeleccionada);
};
