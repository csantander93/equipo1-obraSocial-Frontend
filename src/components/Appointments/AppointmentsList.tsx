import React, { useContext, useEffect } from 'react';
import { AppointmentContext } from '../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../contexts/UserContext/AuthContext';
import './AppointmentsList.css';

const AppointmentList: React.FC = () => {
  const { appointments, loading, error, fetchAppointments } = useContext(AppointmentContext);
  const { user } = useAuth(); // Obtener el usuario del contexto de autenticación

  useEffect(() => {
    if (user && user.id) {
      fetchAppointments(user);
    }
  }, [user, fetchAppointments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="appointment-list-container">
      <h1>Lista de Turnos</h1>
      <table className="appointment-list">
        <thead>
          <tr>
            <th>ID Turno</th>
            <th>Doctor</th>
            <th>Especialidad</th>
            <th>Lugar de atención</th>
            <th>Fecha y Hora</th>
            <th>Motivo de consulta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.idTurno}>
              <td>{appointment.idTurno}</td>
              <td>{appointment.nombreMedico}</td>
              <td>{appointment.especialidadMedico}</td>
              <td>{appointment.lugarAtencion}</td>
              <td>{new Date(appointment.fechaHora).toLocaleString()}</td>
              <td>{appointment.motivoConsulta}</td>
              <td>
                <span>Acciones</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;