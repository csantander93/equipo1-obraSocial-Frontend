import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TAppointmentDate } from '../../../../models/types/requests/TAppointmentDate';
import AppointmentService from '../../../../services/AppointmentService';
import { useAuth } from '../../../../contexts/UserContext/UserContext';
import './CreateAppointment.css'; // Importa el archivo CSS que contiene los estilos
import ScreenMessage from '../../../ScreenMessage/ScreenMessage';

const CreateAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<number | null>(null);
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
        setMessage('Turnos agregados correctamente');
        setStatus(200); // Por ejemplo, usar 200 para indicar éxito
        // Aquí podrías agregar lógica adicional si necesitas redirigir automáticamente
      } catch (error) {
        console.error('Error al crear el turno:', error);
        setMessage('Error al crear el turno. Por favor, inténtelo de nuevo.');
        setStatus(400); // Por ejemplo, usar 400 para indicar error
      }
    }
  };

  const handleScreenMessageClose = () => {
    setMessage('');
    setStatus(null);
    navigate('/AppointmentListDoctor'); // Redirige a la lista de turnos del doctor después de cerrar el mensaje
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

      {message && (
        <ScreenMessage
          message={message}
          status={status || 500} // Usar 500 como estado por defecto si no se especifica
          onClose={handleScreenMessageClose}
        />
      )}
    </div>
  );
};

export default CreateAppointment;
