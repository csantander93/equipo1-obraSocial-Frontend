import React, { useContext, useEffect, useState } from 'react';
import { AppointmentContext } from '../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../contexts/UserContext/AuthContext';
import './AppointmentsList.css';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { FaFileDownload } from 'react-icons/fa';
import RecipeComponent from '../recipe/Recipe';
import AppointmentService from '../../services/AppointmentService';
import { TRecipeDelete } from '../../models/types/requests/TRecipeDelete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AppointmentList: React.FC = () => {
  const { appointments, loading, error, fetchAppointments } = useContext(AppointmentContext);
  const { user } = useAuth();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null); // Estado para almacenar el ID de la receta seleccionada

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

  // Función para manejar la selección de receta y mostrar el popup
  const handleShowRecipe = (idReceta: number) => {
    setSelectedRecipeId(idReceta);
  };

  // Función para cerrar el popup de receta
  const handleCloseRecipe = () => {
    setSelectedRecipeId(null);
  };

  const handleDeleteAppointment = async (idTurno: number) => {
    const dto: TRecipeDelete = { idTurno };
    try {
      await AppointmentService.darBajaTurno(dto);
      if (user) { // Asegurarse de que user no sea null antes de llamar a fetchAppointments
        fetchAppointments(user); // Actualiza la lista de turnos después de eliminar
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const confirmDelete = (idTurno: number) => {
    confirmAlert({
      title: 'Atención',
      message: '¿Está seguro que quiere eliminar el turno?',
      buttons: [
        {
          label: 'Si',
          onClick: () => handleDeleteAppointment(idTurno),
        },
        {
          label: 'No',
        },
      ],
    });
  };

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
                  <FaFileDownload
                    className="recipe-icon"
                    onClick={() => handleShowRecipe(appointment.idReceta)} // Mostrar el popup al hacer clic
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </td>
              {appointment.idReceta === 0 ? (
                <td>
                  <div className="action-icons">
                    <FiEdit className="edit-icon" />
                    <MdDeleteForever 
                      className="delete-icon"
                      onClick={() => confirmDelete(appointment.idTurno)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </td>
              ) : (
                <td>Finalizado</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderizar RecipeComponent como un popup si hay una receta seleccionada */}
      {selectedRecipeId && (
        <RecipeComponent idRecipe={selectedRecipeId} onClose={handleCloseRecipe} />
      )}
    </div>
  );
};

export default AppointmentList;
