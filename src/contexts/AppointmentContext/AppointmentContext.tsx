import React, { createContext, useState, useEffect, useCallback } from 'react';
import AppointmentService from '../../services/AppointmentService';
import { TAppointment } from '../../models/types/entities/TAppointment';
import { useAuth } from '../UserContext/AuthContext';
import { TUser } from '../../models/types/entities/TUser';

interface AppointmentContextProps {
  appointments: TAppointment[];
  loading: boolean;
  error: string | null;
  fetchAppointmentsUser: (user: TUser) => Promise<void>; // Acepta un userId como parámetro
}

export const AppointmentContext = createContext<AppointmentContextProps>({
  appointments: [],
  loading: true,
  error: null,
  fetchAppointmentsUser: () => Promise.resolve(),
});

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<TAppointment[]>([]);
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

  useEffect(() => {
    if (user && user.id) {
      fetchAppointmentsUser(user);
    }
  }, [user, fetchAppointmentsUser]);

  const contextValue: AppointmentContextProps = {
    appointments,
    loading,
    error,
    fetchAppointmentsUser,
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};