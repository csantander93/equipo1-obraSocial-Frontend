import React, { createContext, useState, useEffect, useCallback } from 'react';
import AppointmentService from '../../services/AppointmentService';
import { TAppointment } from '../../models/types/entities/TAppointment';
import { useAuth } from '../UserContext/UserContext';
import { TUser } from '../../models/types/entities/TUser';

interface AppointmentContextProps {
  appointments: TAppointment[];
  doctorAppointments: TAppointment[]; // Nuevo estado para los turnos del médico
  loading: boolean;
  error: string | null;
  fetchAppointmentsUser: (user: TUser) => Promise<void>; // Acepta un userId como parámetro
  fetchDoctorAppointments: (idMedico: number) => Promise<void>; // Nueva función para obtener turnos del médico
}

export const AppointmentContext = createContext<AppointmentContextProps>({
  appointments: [],
  doctorAppointments: [], // Inicializa el nuevo estado
  loading: true,
  error: null,
  fetchAppointmentsUser: () => Promise.resolve(),
  fetchDoctorAppointments: () => Promise.resolve(), // Inicializa la nueva función
});

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<TAppointment[]>([]);
  const [doctorAppointments, setDoctorAppointments] = useState<TAppointment[]>([]); // Nuevo estado para los turnos del médico
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAppointmentsUser = useCallback(async (user: TUser) => {

    setLoading(true);
    try {
      const data = await AppointmentService.getAppointmentListUser(user);
      setAppointments(data);
    } catch (error) {
      setError('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDoctorAppointments = useCallback(async (idMedico: number) => { // Nueva función para obtener turnos del médico
    setLoading(true);
    try {
      const data = await AppointmentService.getAppointmentListDoctor(idMedico);
      setDoctorAppointments(data);
    } catch (error) {
      setError('Error fetching doctor appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchAppointmentsUser(user);
    }
  }, [user, fetchAppointmentsUser]);

  const contextValue: AppointmentContextProps = {
    appointments,
    doctorAppointments, // Proporciona el nuevo estado
    loading,
    error,
    fetchAppointmentsUser,
    fetchDoctorAppointments, // Proporciona la nueva función
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};