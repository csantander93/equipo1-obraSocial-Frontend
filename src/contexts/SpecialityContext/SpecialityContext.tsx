import React, { createContext, useState, useEffect, useCallback } from 'react';
import SpecialityService from '../../services/SpecialityService';
import { TSpeciality } from '../../models/types/entities/TSpeciality';

interface SpecialityContextProps {
  specialities: TSpeciality[];
  loading: boolean;
  error: string | null;
  fetchSpecialities: () => Promise<void>;
}

export const SpecialityContext = createContext<SpecialityContextProps>({
  specialities: [],
  loading: true,
  error: null,
  fetchSpecialities: () => Promise.resolve(),
});

export const SpecialityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [specialities, setSpecialities] = useState<TSpeciality[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecialities = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SpecialityService.getSpecialityList();
      setSpecialities(data);
    } catch (error) {
      setError('Error fetching specialities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpecialities();
  }, [fetchSpecialities]);

  const contextValue: SpecialityContextProps = {
    specialities,
    loading,
    error,
    fetchSpecialities,
  };

  return (
    <SpecialityContext.Provider value={contextValue}>
      {children}
    </SpecialityContext.Provider>
  );
};
