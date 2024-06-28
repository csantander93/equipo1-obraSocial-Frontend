import React, { createContext, useState, useEffect, useCallback } from 'react';
import DoctorService from '../../services/DoctorService';
import { TDoctor } from '../../models/types/entities/TDoctor';

interface DoctorContextProps {
  doctors: TDoctor[];
  loading: boolean;
  error: string | null;
  fetchDoctors: () => Promise<void>;
}

export const DoctorContext = createContext<DoctorContextProps>({
  doctors: [],
  loading: true,
  error: null,
  fetchDoctors: () => Promise.resolve(),
});

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<TDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DoctorService.getDoctorList();
      setDoctors(data);
    } catch (error) {
      setError('Error fetching doctors');
    } finally {
      setLoading(false);    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const contextValue: DoctorContextProps = {
    doctors,
    loading,
    error,
    fetchDoctors,
  };

  return (
    <DoctorContext.Provider value={contextValue}>
      {children}
    </DoctorContext.Provider>
  );
};