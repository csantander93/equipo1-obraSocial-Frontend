import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentContext } from '../../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../../contexts/UserContext/AuthContext';
import './AppointmentListDoctor.css';
import AppointmentService from '../../../services/AppointmentService';
import { TRecipeDelete } from '../../../models/types/requests/TRecipeDelete';
import { MdDeleteForever } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaPlus } from 'react-icons/fa';
import RecipeFormModal from '../../recipe/RecipeFormModal';

const AppointmentListDoctor: React.FC = () => {
  const { appointments, loading, error, fetchAppointmentsUser } = useContext(AppointmentContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [recipeFilter, setRecipeFilter] = useState<string>('');

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

  const handleCreateTurno = () => {
    navigate('/CreateAppointment');
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

  const handleOpenModal = (idTurno: number) => {
    setSelectedAppointmentId(idTurno);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointmentId(null);
  };

  const handleSubmitRecipe = () => {
    if (user) {
      fetchAppointmentsUser(user);
    }
  };

  const handleRecipeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRecipeFilter(event.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (recipeFilter === 'withRecipe') {
      return appointment.idReceta !== 0;
    } else if (recipeFilter === 'withoutRecipe') {
      return appointment.idReceta === 0;
    }
    return true;
  });

  return (
    <div className="appointment-list-container">
      <div className="title-and-button-container">
        <h1>Lista de Turnos</h1>
        <button className="create-turno-btn" onClick={handleCreateTurno}>
          <FaPlus className="create-turno-icon" />
          Crear turnos
        </button>
      </div>
      
      <div className="filters">
        <div className="filter">
          <label htmlFor="recipe-filter">Estado del turno: </label>
          <select id="recipe-filter" value={recipeFilter} onChange={handleRecipeFilterChange}>
            <option value="">Todos</option>
            <option value="withoutRecipe">Pendiente</option>
            <option value="withRecipe">Finalizado</option>
          </select>
        </div>
      </div>

      <table className="appointment-list">
        <thead>
          <tr>
            <th>ID Turno</th>
            <th>Paciente</th>
            <th>Lugar de atención</th>
            <th>Fecha y Hora</th>
            <th>Motivo de consulta</th>
            <th>Receta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.idTurno}>
              <td>{appointment.idTurno}</td>
              <td>{appointment.nombrePaciente}</td>
              <td>{appointment.lugarAtencion}</td>
              <td>{new Date(appointment.fechaHora).toLocaleString()}</td>
              <td>{appointment.motivoConsulta}</td>
              <td>
                {appointment.idReceta !== 0 ? (
                  <span>Receta enviada</span>
                ) : (
                  <button className="create-recipe-btn" onClick={() => handleOpenModal(appointment.idTurno)}>
                    Confeccionar receta
                  </button>
                )}
              </td>
              <td>
                {appointment.idReceta !== 0 ? (
                  <span>Turno finalizado</span>
                ) : (
                  <div className="action-icons">
                    <MdDeleteForever
                      className="delete-icon"
                      onClick={() => confirmDelete(appointment.idTurno)}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <RecipeFormModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        appointmentId={selectedAppointmentId}
        onSubmitSuccess={handleSubmitRecipe}
      />
    </div>
  );
};

export default AppointmentListDoctor;
