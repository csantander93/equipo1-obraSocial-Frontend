import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD:src/components/Appointments/NewAppointment.tsx
import { SpecialityContext } from '../../contexts/SpecialityContext/SpecialityContext';
import { DoctorContext } from '../../contexts/DoctorContext/DoctorContext';
import { AppointmentContext } from '../../contexts/AppointmentContext/AppointmentContext';
import { filterDoctorsBySpecialty } from '../../utils/filterDoctorsBySpecialty';
import AppointmentService from '../../services/AppointmentService';
import { TAppointmentAssign } from '../../models/types/requests/TAppointmentAssign';
import { useAuth } from '../../contexts/UserContext/AuthContext';
import ScreenMessage from '../ScreenMessage/ScreenMessage';
=======
import { SpecialityContext } from '../../../../contexts/SpecialityContext/SpecialityContext';
import { DoctorContext } from '../../../../contexts/DoctorContext/DoctorContext';
import { AppointmentContext } from '../../../../contexts/AppointmentContext/AppointmentContext';
import { filterDoctorsBySpecialty } from '../../../../utils/filterDoctorsBySpecialty';
import AppointmentService from '../../../../services/AppointmentService'; // Ajusta la importación según sea necesario
import { TAppointmentAssign } from '../../../../models/types/requests/TAppointmentAssign';
import { useAuth } from '../../../../contexts/UserContext/AuthContext'; 
>>>>>>> rama_cris:src/components/Appointments/Patient/NewAppointment/NewAppointment.tsx
import './NewAppointment.css';

const NewAppointment: React.FC = () => {
  const { specialities, loading: specialitiesLoading, error: specialitiesError } = useContext(SpecialityContext);
  const { doctors, loading: doctorsLoading, error: doctorsError } = useContext(DoctorContext);
  const { doctorAppointments, loading: appointmentsLoading, error: appointmentsError, fetchDoctorAppointments } = useContext(AppointmentContext);

  const navigate = useNavigate();

  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [consultationReason, setConsultationReason] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<number>(200); // Estado para manejar el estado del mensaje
  const { user } = useAuth();

  useEffect(() => {
    if (selectedDoctor !== null) {
      fetchDoctorAppointments(selectedDoctor);
    }
  }, [selectedDoctor, fetchDoctorAppointments]);

  const handleSubmit = async () => {
    if (selectedSpeciality && selectedDoctor && selectedDate && selectedAppointmentId && consultationReason) {
      const appointmentAssignData: TAppointmentAssign = {
        idTurno: selectedAppointmentId,
        idUsuario: user?.id || 0, // Asegurarse de manejar el caso en que userId sea null o undefined
        motivoConsulta: consultationReason,
      };

      try {
        await AppointmentService.assignAppointmentUser(appointmentAssignData);
        setMessage('Turno asignado exitosamente.');
        setMessageStatus(200);
        setShowMessage(true);
      } catch (error) {
        console.error('Error al asignar turno:', error);
        setMessage('Error al asignar turno.');
        setMessageStatus(500);
        setShowMessage(true);
      }
    } else {
      console.log('Por favor complete todos los campos.');
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    navigate('/AppointmentListPatient');
  };

  if (specialitiesLoading || doctorsLoading || appointmentsLoading) {
    return <div>Loading...</div>;
  }

  if (specialitiesError) {
    return <div>Error: {specialitiesError}</div>;
  }

  if (doctorsError) {
    return <div>Error: {doctorsError}</div>;
  }

  if (appointmentsError) {
    return <div>Error: {appointmentsError}</div>;
  }

  const filteredDoctors = selectedSpeciality
    ? filterDoctorsBySpecialty(doctors, selectedSpeciality)
    : [];

  const availableDates = doctorAppointments.map(appointment => new Date(appointment.fechaHora));

  const isDateSelectable = (date: Date) => {
    return availableDates.some(availableDate =>
      availableDate.getFullYear() === date.getFullYear() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getDate() === date.getDate()
    );
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const selectedDayAppointments = doctorAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.fechaHora);
    return (
      appointmentDate.getFullYear() === selectedDate?.getFullYear() &&
      appointmentDate.getMonth() === selectedDate?.getMonth() &&
      appointmentDate.getDate() === selectedDate?.getDate()
    );
  });

  return (
    <div className="new-appointment-container">
      <h1>Solicitar turno</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label htmlFor="speciality">Seleccione una especialidad: </label>
          <select
            id="speciality"
            value={selectedSpeciality || ''}
            onChange={(e) => {
              setSelectedSpeciality(e.target.value);
              setSelectedDoctor(null); // Resetear selección de doctor al cambiar especialidad
            }}
          >
            <option value="">Seleccione especialidad</option>
            {specialities.map((speciality) => (
              <option key={speciality.idEspecialidad} value={speciality.nombreEspecialidad}>
                {speciality.nombreEspecialidad}
              </option>
            ))}
          </select>
        </div>
        {selectedSpeciality && (
          <div>
            <label htmlFor="doctor">Seleccione un doctor: </label>
            <select
              id="doctor"
              value={selectedDoctor || ''}
              onChange={(e) => setSelectedDoctor(Number(e.target.value))}
            >
              <option value="">Seleccione doctor</option>
              {filteredDoctors.map((doctor) => (
                <option key={doctor.idMedico} value={doctor.idMedico}>
                  {doctor.nombreMedico} - {doctor.ubicacionConsulta}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedDoctor && (
          <div>
            <label htmlFor="date">Seleccione una fecha: </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              filterDate={isDateSelectable}
              placeholderText="Seleccione una fecha"
            />
          </div>
        )}
        {selectedDate && selectedDayAppointments.length > 0 && (
          <div>
            <label htmlFor="appointments">Seleccione un turno: </label>
            <select
              id="appointments"
              value={selectedAppointmentId || ''}
              onChange={(e) => setSelectedAppointmentId(Number(e.target.value))}
            >
              <option value="">Seleccione turno</option>
              {selectedDayAppointments.map((appointment) => {
                const appointmentDate = new Date(appointment.fechaHora);
                return (
                  <option key={appointment.idTurno} value={appointment.idTurno}>
                    {appointmentDate.toLocaleTimeString()}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {selectedAppointmentId && (
          <div>
            <label htmlFor="reason">Motivo de la consulta: </label>
            <textarea
              id="reason"
              value={consultationReason}
              onChange={(e) => setConsultationReason(e.target.value)}
              placeholder="Ingrese el motivo de la consulta"
            />
          </div>
        )}
        <button type="submit">Confirmar</button>
      </form>
      {showMessage && <ScreenMessage message={message} status={messageStatus} onClose={handleCloseMessage} />}
    </div>
  );
};

export default NewAppointment;
