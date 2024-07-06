import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [recipeFilter, setRecipeFilter] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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

  const handleAssignTurno = () => {
    navigate('/CreateAssignedAppointment'); // Navega a la ruta CreateAssignedAppointment
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

  const pageCount = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pageCount - 1;

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredAppointments.slice(offset, offset + itemsPerPage);

  return (
    <div className="appointment-list-container">
      <div className="title-and-button-container">
        <h1>Lista de Turnos</h1>
        <div className='buttons'>
        <button className="create-turno-btn" onClick={handleCreateTurno}>
          <FaPlus className="create-turno-icon" />
          Crear turnos
        </button>
        <button className="assign-turno-btn" onClick={handleAssignTurno}>
          Asignar turno
        </button>
        </div>
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
          {currentItems.map((appointment) => (
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

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={isFirstPage ? 'disabled' : ''}
        nextClassName={isLastPage ? 'disabled' : ''}
        previousLinkClassName={isFirstPage ? 'disabled' : ''}
        nextLinkClassName={isLastPage ? 'disabled' : ''}
        disabledClassName={'disabled'}
      />

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
