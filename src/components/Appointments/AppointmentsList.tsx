import React, { useContext } from 'react';
import { AppointmentContext } from '../../contexts/AppointmentContext/AppointmentContext';
import './AppointmentsList.css';

const AppointmentList: React.FC = () => {
  const { appointments, loading, error } = useContext(AppointmentContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (appointments.length === 0) {
    return <div>No appointments available</div>;
  }

  return (
    <div className="appointment-list-container">
      <h1>Lista de Turnos</h1>
      <ul className="appointment-list">
        {appointments.map((appointment) => (
          <li key={appointment.idTurno} className="appointment-item">
            <p className="appointment-doctor"><strong>Doctor:</strong> {appointment.nombreMedico}</p>
            <p className="appointment-specialization"><strong>Especialidad:</strong> {appointment.especialidadMedico}</p>
            <p className="appointment-location"><strong>Lugar de atención:</strong> {appointment.lugarAtencion}</p>
            <p className="appointment-datetime"><strong>Fecha y Hora:</strong> {appointment.fechaHora.toLocaleString()}</p>
            <p className="appointment-reason"><strong>Motivo de consulta:</strong> {appointment.motivoConsulta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
