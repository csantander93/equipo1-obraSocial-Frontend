import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../contexts/DoctorContext/DoctorContext';
import { TDoctor } from '../../models/types/entities/TDoctor';
import './DoctorList.css'; // Asegúrate de importar el CSS

const DoctorList: React.FC = () => {
  const { doctors, loading, error, fetchDoctors } = useContext(DoctorContext);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (doctors.length === 0) {
    return <div>No doctors available</div>;
  }

  return (
    <div className="doctor-list-container">
      <h1>Lista de Especialistas</h1>
      <ul className="doctor-list">
        {doctors.map((doctor: TDoctor, index) => (
          <li key={index} className="doctor-item">
            <p className="doctor-name"><strong>Nombre:</strong> {doctor.nombreMedico}</p>
            <p className="doctor-specialization"><strong>Especialidad:</strong> {doctor.nombreEspecialidad}</p>
            <p className="doctor-info"><strong>Horario de atención:</strong> {doctor.atencionDesde} - {doctor.atencionHasta}</p>
            <p className="doctor-info"><strong>Lugar de atención:</strong> {doctor.ubicacionConsulta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
