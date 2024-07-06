import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RecipeFormModal.css'; // Importa el archivo CSS aquí
import { AppointmentContext } from '../../contexts/AppointmentContext/AppointmentContext';
import { useAuth } from '../../contexts/UserContext/AuthContext';
import RecipeService from '../../services/RecipeService';
import { TRecipeRequest } from '../../models/types/requests/TRecipeRequest';


interface RecipeFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  appointmentId: number | null;
  onSubmitSuccess: () => void;
}

const RecipeFormModal: React.FC<RecipeFormModalProps> = ({ isOpen, onRequestClose, appointmentId, onSubmitSuccess }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const { appointments } = useContext(AppointmentContext);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && diagnosis && treatment && appointmentId && user) {
      const appointment = appointments.find(a => a.idTurno === appointmentId);
      if (!appointment) {
        alert('Turno no encontrado');
        return;
      }

      const dto: TRecipeRequest = {
        fecha: selectedDate,
        diagnostico: diagnosis,
        tratamiento: treatment,
        idTurno: appointmentId,
        idUsuario: user.id,
        idPaciente: appointment.idPaciente, 
      };

      try {
        await RecipeService.createRecipe(dto);
        alert('Receta creada correctamente.');
        onSubmitSuccess();
        onRequestClose();
      } catch (error) {
        alert('Error al crear la receta');
        console.error(error);
      }
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confeccionar Receta"
      className="recipe-form-modal"
      overlayClassName="recipe-form-modal-overlay"
    >
      <h2>Confeccionar Receta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Seleccione una fecha:</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            placeholderText="Seleccione una fecha"
            minDate={new Date()}
            className="date-picker-input"
          />
        </div>
        <div>
          <label>Diagnóstico:</label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Ingrese el diagnóstico"
            maxLength={50}
          />
        </div>
        <div>
          <label>Tratamiento:</label>
          <textarea
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            placeholder="Ingrese el tratamiento"
            maxLength={50}
          />
        </div>
        <div className="button-group">
          <button type="submit">Guardar Receta</button>
          <button type="button" className="close-button" onClick={onRequestClose}>Cerrar</button>
        </div>
      </form>
    </Modal>
  );
};

export default RecipeFormModal;
