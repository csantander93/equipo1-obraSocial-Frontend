import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import AppointmentService from '../../../../services/AppointmentService';
import { TAppointmentEdit } from '../../../../models/types/requests/TAppointmentEdit';
import './EditAppointment.css';
import { AppointmentContext } from '../../../../contexts/AppointmentContext/AppointmentContext';
import ScreenMessage from '../../../ScreenMessage/ScreenMessage';

const EditAppointment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state as { appointment: any };
  const { doctorAppointments, fetchDoctorAppointments, loading, error } = useContext(AppointmentContext);

  const initialDate = new Date(appointment.fechaHora);
  const initialReason = appointment.motivoConsulta;

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [consultationReason, setConsultationReason] = useState<string>(initialReason);
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<number>(200);

  useEffect(() => {
    if (appointment && appointment.idMedico) {
      fetchDoctorAppointments(appointment.idMedico);
    }
  }, [appointment, fetchDoctorAppointments]);

  useEffect(() => {
    if (selectedDate) {
      const timesForSelectedDate = doctorAppointments
        .filter(app => new Date(app.fechaHora).toDateString() === selectedDate.toDateString())
        .map(app => new Date(app.fechaHora));
      setAvailableTimes(timesForSelectedDate);
    }
  }, [selectedDate, doctorAppointments]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
  };

  const handleMotivoConsultaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConsultationReason(event.target.value);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!selectedDate || !selectedTime || !consultationReason) {
        throw new Error('Por favor complete todos los campos.');
      }

      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );

      const dto: TAppointmentEdit = {
        idTurno: appointment.idTurno,
        fechaHoraNueva: combinedDateTime,
        nuevoMotivoConsulta: consultationReason,
      };

      await AppointmentService.editAppointment(dto);
      setMessage('Turno actualizado exitosamente.');
      setMessageStatus(200);
      setShowMessage(true);
    } catch (error) {
      console.error('Error actualizando el turno:', error);
      setMessage('Error actualizando el turno.');
      setMessageStatus(500);
      setShowMessage(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    navigate('/AppointmentListPatient');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="edit-appointment-container">
      <h1>Editar Turno</h1>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="speciality">Especialidad: </label>
          <input
            type="text"
            id="speciality"
            value={appointment.especialidadMedico}
            disabled
          />
        </div>
        <div>
          <label htmlFor="doctor">Médico: </label>
          <input
            type="text"
            id="doctor"
            value={appointment.nombreMedico}
            disabled
          />
        </div>
        <div>
          <label htmlFor="date">Seleccione una fecha:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Seleccione una fecha"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="form-control"
            includeDates={doctorAppointments.map((appointment) => new Date(appointment.fechaHora))}
          />
        </div>
        {selectedDate && availableTimes.length > 0 && (
          <div>
            <label htmlFor="time">Seleccione una hora:</label>
            <select id="time" className="form-control" onChange={(e) => handleTimeChange(new Date(e.target.value))}>
              <option value="">Seleccione un horario</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time.toISOString()}>{time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="reason">Motivo de la consulta: </label>
          <textarea
            id="reason"
            value={consultationReason}
            onChange={handleMotivoConsultaChange}
            placeholder="Ingrese el nuevo motivo de la consulta"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Turno</button>
      </form>
      {showMessage && <ScreenMessage message={message} status={messageStatus} onClose={handleCloseMessage} />}
    </div>
  );
};

export default EditAppointment;
