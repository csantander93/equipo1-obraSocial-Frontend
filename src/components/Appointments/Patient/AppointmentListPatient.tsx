import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AppointmentContext } from '../../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../../contexts/UserContext/UserContext';
import './AppointmentListPatient.css';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { FaFileDownload } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";
import RecipeComponent from '../../recipe/Recipe';
import AppointmentService from '../../../services/AppointmentService';
import { TRecipeDelete } from '../../../models/types/requests/TRecipeDelete';
import { confirmAlert } from 'react-confirm-alert';
import { SpecialityContext } from '../../../contexts/SpecialityContext/SpecialityContext';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { filterAppointments } from '../../../utils/filterAppointments';
import { TAppointment } from '../../../models/types/entities/TAppointment';
import ReasonConsultPopup from '../../popup/ReasonConsultPopUp'; // Importar el componente popup

const AppointmentListPatient: React.FC = () => {
  const { appointments, loading, error, fetchAppointmentsUser } = useContext(AppointmentContext);
  const { specialities } = useContext(SpecialityContext);
  const { user } = useAuth();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [recipeFilter, setRecipeFilter] = useState<string>('');
  const [specialityFilter, setSpecialityFilter] = useState<string>('');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Estado para el tooltip
  const [currentPage, setCurrentPage] = useState(0);
  const [showReasonPopup, setShowReasonPopup] = useState<boolean>(false); // Estado para mostrar el popup
  const [selectedMotivoConsulta, setSelectedMotivoConsulta] = useState<string>(''); // Estado para el motivo de consulta seleccionado
  const [itemsPerPage, setItemsPerPage] = useState(10); // Estado para el número de items por página
  const navigate = useNavigate();

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

  const handleShowRecipe = (idReceta: number) => {
    setSelectedRecipeId(idReceta);
  };

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

  const handleRequestAppointment = () => {
    navigate('/NewAppointment');
  };

  const handleRecipeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRecipeFilter(event.target.value);
  };

  const handleSpecialityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecialityFilter(event.target.value);
  };

  const handleEditAppointment = (appointment: TAppointment) => {
    navigate(`/EditAppointment`, { state: { appointment } });
  };

  const handleOpenReasonPopup = (motivo: string) => {
    setSelectedMotivoConsulta(motivo);
    setShowReasonPopup(true);
  };

  const handleCloseReasonPopup = () => {
    setSelectedMotivoConsulta('');
    setShowReasonPopup(false);
  };

  const filteredAppointments = filterAppointments(appointments, recipeFilter, specialityFilter);

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
      <div className="header-container">
        <h1>Lista de Turnos</h1>
        <button
          className="request-appointment-button"
          onClick={handleRequestAppointment}
        >
          <FaPlus /> Solicitar turno
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
        <div className="filter">
          <label htmlFor="speciality-filter">Filtrar por especialidad: </label>
          <select id="speciality-filter" value={specialityFilter} onChange={handleSpecialityFilterChange}>
            <option value="">Todas</option>
            {specialities.map((speciality) => (
              <option key={speciality.idEspecialidad} value={speciality.nombreEspecialidad}>
                {speciality.nombreEspecialidad}
              </option>
            ))}
          </select>
        </div>
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
          {currentItems.map((appointment, index) => (
            <tr key={appointment.idTurno}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}>
              <td>{appointment.idTurno}</td>
              <td>{appointment.nombreMedico}</td>
              <td>{appointment.especialidadMedico}</td>
              <td>{appointment.lugarAtencion}</td>
              <td>{new Date(appointment.fechaHora).toLocaleString('es-ES', { hour12: false })}</td>
              <td className="motivo-consulta">
                <button className="consultation-reason-button" onClick={() => handleOpenReasonPopup(appointment.motivoConsulta)}>
                  Ver motivo
                </button>
              </td>
              <td>
                {appointment.idReceta === 0 ? (
                  <span>No hay receta</span>
                ) : (
                  <FaFileDownload
                    className="recipe-icon"
                    onClick={() => handleShowRecipe(appointment.idReceta)}
                  />
                )}
              </td>
              {appointment.idReceta === 0 ? (
                <td>
                  <div className="action-icons">
                    <FiEdit
                      className="edit-icon"
                      onClick={() => handleEditAppointment(appointment)} 
                    />
                    <MdDeleteForever
                      className="delete-icon"
                      onClick={() => confirmDelete(appointment.idTurno)}
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

      {showReasonPopup && (
        <ReasonConsultPopup motivo={selectedMotivoConsulta} onClose={handleCloseReasonPopup} />
      )}

      {selectedRecipeId && (
        <RecipeComponent idRecipe={selectedRecipeId} onClose={handleCloseRecipe} />
      )}
    </div>
  );
};

export default AppointmentListPatient;
