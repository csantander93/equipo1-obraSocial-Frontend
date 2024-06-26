import React, { createContext, useState, useEffect, useCallback } from 'react';
import AppointmentService from '../../services/AppointmentService';
import { TAppointment } from '../../models/types/entities/TAppointment';
import { useAuth } from '../UserContext/AuthContext';
import { TUser } from '../../models/types/entities/TUser';

interface AppointmentContextProps {
  appointments: TAppointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: (user: TUser) => Promise<void>; // Acepta un userId como parámetro
}

export const AppointmentContext = createContext<AppointmentContextProps>({
  appointments: [],
  loading: true,
  error: null,
  fetchAppointments: () => Promise.resolve(),
});

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<TAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAppointments = useCallback(async (user: TUser) => {
    setLoading(true);
    try {
      const data = await AppointmentService.getAppointmentList(user);
      setAppointments(data);
    } catch (error) {
      setError('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchAppointments(user);
    }
  }, [user, fetchAppointments]);

  const contextValue: AppointmentContextProps = {
    appointments,
    loading,
    error,
    fetchAppointments,
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};