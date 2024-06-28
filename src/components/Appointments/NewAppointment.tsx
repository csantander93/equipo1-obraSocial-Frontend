import React, { useContext, useState } from 'react';
import { SpecialityContext } from '../../contexts/SpecialityContext/SpecialityContext';
import { DoctorContext } from '../../contexts/DoctorContext/DoctorContext';
import { filterDoctorsBySpecialty } from '../../utils/TDoctorsListFilter';
import './NewAppointment.css'; // Import CSS if you have any

const NewAppointment: React.FC = () => {
  const { specialities, loading: specialitiesLoading, error: specialitiesError } = useContext(SpecialityContext);
  const { doctors, loading: doctorsLoading, error: doctorsError } = useContext(DoctorContext);

  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedSpeciality && selectedDoctor) {
      // Handle the selected speciality and doctor (e.g., send it to a backend service)
      console.log('Selected Speciality:', selectedSpeciality);
      console.log('Selected Doctor ID:', selectedDoctor);
      // Additional logic to process the selected speciality and doctor
    } else {
      console.log('Please select a speciality and a doctor.');
    }
  };

  if (specialitiesLoading || doctorsLoading) {
    return <div>Loading...</div>;
  }

  if (specialitiesError) {
    return <div>Error: {specialitiesError}</div>;
  }

  if (doctorsError) {
    return <div>Error: {doctorsError}</div>;
  }

  // Filtrar los doctores por la especialidad seleccionada usando la función de utilidad
  const filteredDoctors = selectedSpeciality
    ? filterDoctorsBySpecialty(doctors, selectedSpeciality)
    : [];

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
                  {doctor.nombreMedico+" - "}
                  {doctor.ubicacionConsulta}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default NewAppointment;