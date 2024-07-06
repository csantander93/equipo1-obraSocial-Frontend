import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useHistory
import { useAuth } from '../../../../contexts/UserContext/UserContext';
import AppointmentService from '../../../../services/AppointmentService';
import { TUserPatient } from '../../../../models/types/entities/TUserPatient';
import { TAppointmentWithPatient } from '../../../../models/types/requests/TAppointmentWithPatient';
import './CreateAssignedAppointment.css'; // Importar el archivo CSS

const CreateAssignedAppointment: React.FC = () => {
  const { user, userPatients, fetchUserPatients } = useAuth();
  const navigate = useNavigate(); // Obtener el objeto history para la navegación
  const [dni, setDni] = useState<string>(''); // Inicializar como string vacío
  const [filteredPatients, setFilteredPatients] = useState<TUserPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<TUserPatient | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultaValue, setConsultaValue] = useState<string>(''); // Estado para el valor de la consulta

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
    setDni(''); // Limpiar el campo de búsqueda después de seleccionar
  };

  const handleSubmit = async () => {
    if (user && selectedPatient && selectedDate && selectedTime && consultaValue.length <= 50) {
      const appointmentDTO: TAppointmentWithPatient = {
        idUsuario: user.id,
        idPaciente: selectedPatient.idPaciente,
        fecha_hora: new Date(`${selectedDate}T${selectedTime}:00`),
        motivoConsulta: consultaValue // Usar el valor del textarea para el motivo de la consulta
      };
      try {
        await AppointmentService.createAppointmentWithPatient(appointmentDTO);
        alert('Cita creada exitosamente');
        navigate('/AppointmentListDoctor'); // Navegar a la ruta AppointmentListDoctor después de crear la cita
      } catch (error) {
        console.error('Error creando la cita:', error);
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
    </div>
  );
};

export default CreateAssignedAppointment;
