import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/UserContext/UserContext';
import AppointmentService from '../../../../services/AppointmentService';
import { TUserPatient } from '../../../../models/types/entities/TUserPatient';
import { TAppointmentWithPatient } from '../../../../models/types/requests/TAppointmentWithPatient';
import './CreateAssignedAppointment.css';
import ScreenMessage from '../../../ScreenMessage/ScreenMessage';

const CreateAssignedAppointment: React.FC = () => {
  const { user, userPatients, fetchUserPatients } = useAuth();
  const navigate = useNavigate();
  const [dni, setDni] = useState<string>('');
  const [filteredPatients, setFilteredPatients] = useState<TUserPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<TUserPatient | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultaValue, setConsultaValue] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    if (userPatients.length === 0) {
      fetchUserPatients();
    }
  }, [userPatients, fetchUserPatients]);

  useEffect(() => {
    if (dni) {
      const results = userPatients.filter(patient =>
        patient.dni.toLowerCase().includes(dni.toLowerCase()) ||
        patient.nombreCompleto.toLowerCase().includes(dni.toLowerCase())
      );
      setFilteredPatients(results);
    } else {
      setFilteredPatients([]);
    }
  }, [dni, userPatients]);

  const handleSelectPatient = (patient: TUserPatient) => {
    setSelectedPatient(patient);
    setFilteredPatients([]);
    setDni('');
  };

  const handleSubmit = async () => {
    if (user && selectedPatient && selectedDate && selectedTime && consultaValue.length <= 50) {
      const appointmentDTO: TAppointmentWithPatient = {
        idUsuario: user.id,
        idPaciente: selectedPatient.idPaciente,
        fecha_hora: new Date(`${selectedDate}T${selectedTime}:00`),
        motivoConsulta: consultaValue
      };
      try {
        await AppointmentService.createAppointmentWithPatient(appointmentDTO);
        setMessage('Cita creada exitosamente');
        setStatus(200);
        setShowMessage(true);
      } catch (error) {
        console.error('Error creando la cita:', error);
        setMessage('Error creando la cita');
        setStatus(500);
        setShowMessage(true);
      }
    } else {
      alert('El valor de la consulta debe tener menos de 50 caracteres.');
    }
  };

  return (
    <div className="container">
      <h1>Crear Cita Asignada</h1>
      <div className="form-group">
        <label>
          Buscar paciente por DNI o Nombre:
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ingrese DNI o nombre"
          />
        </label>
      </div>
      {filteredPatients.length > 0 && (
        <div className="results">
          <h2>Resultados de búsqueda:</h2>
          <ul>
            {filteredPatients.map(patient => (
              <li key={patient.idPaciente} onClick={() => handleSelectPatient(patient)}>
                <span className="patient-info-label">Nombre Completo:</span> {patient.nombreCompleto} <br />
                <span className="patient-info-label">Documento:</span> {patient.dni}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedPatient && (
        <div>
          <h2>Paciente seleccionado:</h2>
          <div className="selected-patient-info">
            <p><span className="patient-info-label">Nombre Completo:</span> {selectedPatient.nombreCompleto}</p>
            <p><span className="patient-info-label">Documento:</span> {selectedPatient.dni}</p>
          </div>
          <div className="form-group">
            <label>
              Seleccionar fecha:
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Seleccionar hora:
              <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Motivo de consulta:
            </label>
            <textarea
              value={consultaValue}
              onChange={(e) => setConsultaValue(e.target.value)}
              maxLength={50}
              placeholder="Ingrese consulta aquí"
              className="consulta-textarea"
            />
          </div>
          <button className="submit-btn" onClick={handleSubmit}>Crear Cita</button>
        </div>
      )}
      {showMessage && (
        <ScreenMessage
          message={message}
          status={status}
          onClose={() => setShowMessage(false)}
          onRedirect={() => navigate('/AppointmentListDoctor')}
        />
      )}
    </div>
  );
};

export default CreateAssignedAppointment;
