import React, { useContext, useEffect } from 'react';
import { AppointmentContext } from '../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../contexts/UserContext/AuthContext';
import './AppointmentsList.css';
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaFileDownload } from "react-icons/fa";

const AppointmentList: React.FC = () => {
  const { appointments, loading, error, fetchAppointments } = useContext(AppointmentContext);
  const { user } = useAuth();

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
            <th>Recetas</th>
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
                {appointment.idReceta === 0 ? (
                  <span>No hay receta</span>
                ) : (
                  <FaFileDownload className="recipe-icon" />
                )}
              </td>
              {appointment.idReceta === 0 ? (
                <td>
                <div className="action-icons">
                  <FiEdit className="edit-icon" />
                  <MdDeleteForever className="delete-icon" />
                </div>
              </td>
              ) : (
                <td>Finalizado</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
