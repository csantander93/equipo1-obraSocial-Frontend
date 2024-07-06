// utils/filterUtils.ts
import { TAppointment } from "../models/types/entities/TAppointment";

export const filterAppointments = (
  appointments: TAppointment[],
  recipeFilter: string,
  specialityFilter: string
): TAppointment[] => {
  return appointments.filter((appointment) => {
    const matchesRecipeFilter =
      (recipeFilter === 'withRecipe' && appointment.idReceta !== 0) ||
      (recipeFilter === 'withoutRecipe' && appointment.idReceta === 0) ||
      recipeFilter === '';

    const matchesSpecialityFilter =
      specialityFilter === '' || appointment.especialidadMedico === specialityFilter;

    return matchesRecipeFilter && matchesSpecialityFilter;
  });
};
