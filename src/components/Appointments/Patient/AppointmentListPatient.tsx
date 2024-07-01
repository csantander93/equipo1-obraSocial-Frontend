import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentContext } from '../../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../../contexts/UserContext/AuthContext';
import './AppointmentListPatient.css';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { FaFileDownload } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";
import RecipeComponent from '../../recipe/Recipe';
import AppointmentService from '../../../services/AppointmentService';
import { TRecipeDelete } from '../../../models/types/requests/TRecipeDelete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AppointmentListPatient: React.FC = () => {
  const { appointments, loading, error, fetchAppointmentsUser } = useContext(AppointmentContext);
  const { user } = useAuth();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const navigate = useNavigate(); // Use navigate for navigation

  useEffect(() => {
    if (user && user.id) {
      fetchAppointmentsUser(user);
    }
  }, [user, fetchAppointmentsUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to handle showing the recipe
  const handleShowRecipe = (idReceta: number) => {
    setSelectedRecipeId(idReceta);
  };

  // Function to handle closing the recipe
  const handleCloseRecipe = () => {
    setSelectedRecipeId(null);
  };

  const handleDeleteAppointment = async (idTurno: number) => {
    const dto: TRecipeDelete = { idTurno };
    try {
      await AppointmentService.cancelAppointment(dto);
      if (user) {
        fetchAppointmentsUser(user);
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

  // Function to navigate to the NewAppointment component
  const handleRequestAppointment = () => {
    navigate('/NewAppointment');
  };

  return (
    <div className="appointment-list-container">
      <div className="header-container">
        <h1>Lista de Turnos</h1>
        <button
          className="request-appointment-button"
          onClick={handleRequestAppointment}
        >
          <FaPlus style={{ verticalAlign: 'middle', color: '#5ecc6d', marginRight: '5px', fontSize: '15px' }} /> Solicitar turno
        </button>
      </div>
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
                    onClick={() => handleShowRecipe(appointment.idReceta)}
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
                <td>Turno Finalizado</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render RecipeComponent as a popup if a recipe is selected */}
      {selectedRecipeId && (
        <RecipeComponent idRecipe={selectedRecipeId} onClose={handleCloseRecipe} />
      )}
    </div>
  );
};

export default AppointmentListPatient;
