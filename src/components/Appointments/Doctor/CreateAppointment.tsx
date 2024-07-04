import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TAppointmentDate } from '../../../models/types/requests/TAppointmentDate';
import AppointmentService from '../../../services/AppointmentService';
import { useAuth } from '../../../contexts/UserContext/AuthContext';
import './CreateAppointment.css'; // Importa el archivo CSS que contiene los estilos

const CreateAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSaveAppointment = async () => {
    if (selectedDate) {
      const appointmentData: TAppointmentDate = {
        idUsuario: user?.id || 0,
        fecha: selectedDate,
      };

      try {
        console.log(appointmentData);
        await AppointmentService.createAppointment20Min(appointmentData);
        alert('Turnos agregados correctamente');
        navigate('/AppointmentListDoctor');
      } catch (error) {
        console.error('Error al crear el turno:', error);
        alert('Error al crear el turno. Por favor, inténtelo de nuevo.');
      }
    }
  };

  return (
    <div className="AppointmentForm">
      <label>Seleccionar Fecha:</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Seleccione una fecha"
        className="datepicker-input"
      />
      <div className="message-box">
        <p>Nota: Si usted quiere cargar turnos para la fecha seleccionada, tenga en cuenta que se cargarán turnos cada 20 minutos dentro de su intervalo de tiempo laboral.</p>
        <p className='ejemplo'>Por ejemplo: si usted trabaja de 10:00 a 12:00, se le cargarían 7 turnos en la fecha seleccionada.</p>
      </div>
      <button onClick={handleSaveAppointment}>Guardar Turnos</button>
    </div>
  );
};

export default CreateAppointment;